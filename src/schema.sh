#!/bin/bash


usage() {
    cat<<EOF
Usage: ${0} [OPTION]... {SCHEMA_NAME} [FILTER]

The option --setup quickly sets up the dependencies of this script and installs
it under \${HOME}/bin

This script is used to quickly get a copy of a COLLECTION in _SCHEMA
from mongodb. It also caches the results so that subsequent requests
do not have to use the mongodb client. The second OPTIONAL argument can
be used to search for a specific FIELD in the SCHEMA. The FIELD search is
case insensitive and uses grep.

Schema Caches are stored by default at /tmp/schema-{collectionName}.
If the environment variable SCHEMA_CACHEDIR is set it is used as the
root path under which to store the Cache files.



[EXAMPLE]

  schema _USER
  # Get the full _USER schema from the _SCHEMA collection

  schema _USER email
  # Search within the _USER schema for a field named 'email'


[OPTIONS]

  --help
    Display this message.

  --connection-string=<constr> | --connection-string <constr> | -c <constr>
    The MongoDB URI. For example:
    mongodb+srv://<username>:<password>@<hostname>:<port>

    If this option in not supplied the script looks for a value in the
    MONGO_URL environment variable.

  --update | -u
    Do not make use of the Cache. Caches the new version.

  --only-fields | -f
    The _SCHEMA COLLECTION includes many fields including metadata.
    This option filters the results to only include actual fields.

  --only-indexes | -i
    Get a list of the COLLECTION's indexes

  --setup
    Install dependencies and then install script under \${HOME}/bin

EOF
}

# Exit on error
set -o errexit

true() {
    if [[ "${!1}" == true ]]; then
        return 0
    else
        return 1
    fi
}

false() {
    if [[ "${!1}" == false || "${!1}" == "" ]]; then
        return 0
    else
        return 1
    fi
}

# Options
ONLY_INDEXES=false
ONLY_FIELDS=false
CONNECTION_STRING=$MONGO_URL
UPDATE=false

# Positonal arguments
SCHEMA= # 1
SEARCH_FIELD= # 2 Optional

# Schema cache directory
if false SCHEMA_CACHEDIR; then
    SCHEMA_CACHEDIR=${TMPDIR:-/tmp}
fi



main() {
    parse_args "$@"
    set -- "${POSARGS[@]}"
    SCHEMA="${1}"
    FILTER="${2}"
    false SCHEMA && fatal "Missing argument: schema (see --help)"
    false CONNECTION_STRING && fatal "Missing argument: --connection-string (see --help)"

    get_schema "$SCHEMA" | project | filter "$FILTER"
}

get_schema() {
    CACHEFILE="${SCHEMA_CACHEDIR}/schema-${1}"
    if [[ ! -f "$CACHEFILE" ]] || true UPDATE; then
        full_schema "$1" | tee "${CACHEFILE}"
    else
        cat "$CACHEFILE"
    fi
}
project() {
    if true ONLY_INDEXES; then
        cat - | only_indexes
    elif true ONLY_FIELDS; then
        cat - | only_fields
    else
        cat -
    fi
}
filter() {
    if [[ -n "${1:-}" ]]; then
        cat - | grep -ni "$1" | sed 's/ //g'
    else
        cat -
    fi
}

full_schema() {
    mongosh --json=relaxed \
            --eval "$(quote "db.getCollection(\"_SCHEMA\").find({ _id: \"${1}\" }).toArray()")" \
            "${MONGO_URL}" | jq '.[0]'
}
only_indexes() {
    jq '._metadata.indexes'
}
only_fields() {
    jq 'del(._metadata)'
}
setup() {
    # INSTALL jq
    if ! command -v jq; then
        sudo apt install jq
    fi

    # INSTALL mongosh
    if ! command -v mongosh; then
        wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/server-7.0.asc

        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
        sudo apt update && upgrade
        sudo apt install -y mongodb-mongosh
    fi

    # # INSTALL script
    mkdir -p ~/bin
    exename="$(basename "$0")"
    exename="${exename%.*}"
    cp "$0" ~/bin/"${exename}"
    if ! command -v "${exename}"; then
        echo "$(quote ${HOME}/bin) is not in your \$PATH"
        echo 'To include it add this to your .bashrc or .profile'
        echo '
# Set $PATH to include ${HOME}/bin
PATH="$HOME/bin:$PATH"
'
    fi
}

parse_args() {
    declare -ga POSARGS=()
    while (($# > 0)); do
        case "${1:-}" in
            --connection-string=* | --connection-string* | -c)
                CONNECTION_STRING=$(parse_param "$@") || shift $?
                ;;
            --update | -u)
                UPDATE=true
                ;;
            --only-fields | -f)
                ONLY_FIELDS=true
                ;;
            --only-indexes | -i)
                ONLY_INDEXES=true
                ;;
            --setup)
                setup
                exit 0
                ;;
            -h | --help)
                usage
                exit 0
                ;;
            -[a-zA-Z][a-zA-Z]*)
                local i="${1:-}"
                shift
                local rest="$@"
                set --
                for i in $(echo "$i" | grep -o '[a-zA-Z]'); do
                    set -- "$@" "-$i"
                done
                set -- $@ $rest
                continue
                ;;
            --)
                shift
                POSARGS+=("$@")
                ;;
            -[a-zA-Z]* | --[a-zA-Z]*)
                fatal "Unrecognized argument ${1:-}"
                ;;
            *)
                POSARGS+=("${1:-}")
                ;;
        esac
        shift
    done
}

parse_param() {
    local param arg
    local -i toshift=0

    if (($# == 0)); then
        return $toshift
    elif [[ "$1" =~ .*=.* ]]; then
        param="${1%%=*}"
        arg="${1#*=}"
    elif [[ "${2-}" =~ ^[^-].+ ]]; then
        param="$1"
        arg="$2"
        ((toshift++))
    fi

    if [[ -z "${arg-}" && ! "${OPTIONAL-}" ]]; then
        fatal "${param:-$1} requires an argument"
    fi

    echo "${arg:-}"
    return $toshift
}

quote() {
    echo \'"$@"\'
}

debug() {
    [ ! $DEBUG ] && return
    echo "$@" >&2
}

fatal() {
    echo -e $0: "$@" >&2
    exit 1
}

debugv() {
    echo $1:"${!1}"
}

main "$@"
