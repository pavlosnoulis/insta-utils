#!/bin/bash

set -o errexit

usage() {
    cat <<EOF
NAME
  ticket - Quickly setup necessary infrastructure for ticket development

SYNOPSIS
  ticket [OPTION]... TICKET_ID REPOSITORY_ALIAS,...

DESCRIPTION
  Creates a directory under the current working directory suitably
  named after the TICKET_ID. That TICKETDIR is then filled up with nice tools to
  have. The scaffolding process is influenced through the available options.

  -C, --directory=DIR
      Create the TICKETDIR under DIR

COLOPHON
  Lazzzzzzy

EOF
}

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

##################################################
# CONSTANTS
##################################################
CACHEDIR=~/.ticket.d/var/cache
CONFDIR=~/.ticket.d/etc

main() {
    parse_args "$@"
    set -- "${POSARGS[@]}"

    read_config
    repos=()
    resolve_repository_aliases "${@:1:(($# - 1))}"
    debugv repos
    resolve_ticketid ${@:($#):1}
    debugv ticket
    ticketpath="$(realpath -m "${DIR:-.}")/${ticket}"
    debugv ticketpath
    mkdir -p "$ticketpath"
    clone_repos
    create_readme
}

read_config() {
    debugv CONFDIR
    local confile=${CONFDIR}/ticket.conf
    [[ ! -d $CONFDIR ]] && mkdir -vp $CONFDIR
    [[ ! -f $confile ]] && cat <<EOF > $confile
instadata='git@github.com:InstaShopDevs/instadata.git'
dashboard='git@github.com:InstaShopDevs/dashboard.git'
dashboard_old='git@github.com:InstaShopDevs/instashop.ae.git'
eshop='git@github.com:InstaShopDevs/insta-webshop.git'
instadata_testing_environments=
dashboard_testing_environments=
dashboard_old_testing_environments=
eshop_testing_environments=
EOF
    source $confile
}

resolve_repository_aliases() {
    for repo_alias in "${@}"; do
        if [[ -z "${!repo_alias}" ]]; then
            fatal "Empty repository alias: $(quote $repo_alias)"
        fi
        repos+=("${repo_alias}=${!repo_alias}")
    done
}

resolve_ticketid() {
    local number
    local summary
    case "${1:-}" in
        */INSTASHOP* | INSTASHOP*)
            number=$(echo "$1" | sed -En 's/.*INSTASHOP-?([0-9]+).*/\1/p')
            summary="$(echo "$1" | sed -En 's/.*INSTASHOP-?[0-9]+[-_](.*)/\1/p')"
            ;;
        [0-9]*)
            number=$(echo "$1" | sed -En 's/^([0-9]+).*/\1/p')
            summary="$(echo "$1" | sed -En 's/^[0-9]+[-_]?(.*)/\1/p')"
            ;;
        *)
            fatal "Unrecognized ticket id format: $(quote "${1:-}")"
    esac

    [[ -z "${summary:-}" ]] && read -r -p 'summary -> ' summary
    summary=$(echo "$summary" | sed -E 's/ |_/-/g' | tr '[A-Z]' '[a-z]')
    ticket="INSTASHOP-${number}_${summary}"
}

clone_repos() {

    mkdir -p "${CACHEDIR}"
    cd "${CACHEDIR}"

    for repo in "${repos[@]}"; do
        alias="${repo%=*}"
        remote="${repo#*=}"

        # master clone
        master_clone="${alias}.git"
        debugv master_clone
        if [[ ! -d "$master_clone" ]]; then
            git clone --mirror "$remote" "$master_clone"
        fi

        # fetch newest changes
        cd "$master_clone"
        git fetch --all
        cd ../

        # ticket's clone
        ticket_clone="${master_clone}.${ticket}"
        debugv ticket_clone
        set +o errexit
        git clone --branch=staging --single-branch "$master_clone" "$ticket_clone"

        # symlink tickets_clone under TICKETDIR
        cd "$ticketpath"
        ln -sT "${CACHEDIR}/${ticket_clone}" "$alias"
        cd "$alias"
        git switch --create "$ticket"
        cd "$CACHEDIR"
    done

    return 0
}

create_readme() {
    cat <<EOF > "${ticketpath}/README.md"
# About
Container project for the development of the ticket:


$ticket

EOF
}


parse_args() {
    declare -ga POSARGS=()
    while (($# > 0)); do
        case "${1:-}" in
            -C | --directory=* | --directory*)
                DIR=$(parse_param "$@") || shift $?
                ;;
            -h | --help)
                usage
                exit 0
                ;;
            --debug | -D)
                DEBUG=1
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

    [ ! $DEBUG ] && return
    case "${1:-}" in
        -r)
            echo "${1:-}"
            ;;
        *)
            echo $1:"${!1}"
            ;;
    esac
}

main "$@"
