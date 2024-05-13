import { getClientMongo, closeClientMongo } from "../src/getClientMongo.js";

async function main() {
  const options = getopts(optionsSchema, process.argv.slice(2));

  if (options.get("--help")) {
    usage();
    process.exit(0);
  }

  const dperms = getDefaultPerms();
  const fperms = getFilePerms();
  const cperms = options.get("--perms");

  try {
    const client = await getClientMongo({
      url: process.env.MONGO_URL,
      db: process.env.MONGO_DB_NAME,
    });

    const sourceUserPerms = await getUserPerms(
      client,
      options.get("--user").split(":").at(0),
    );
    const targetUserPerms = await getUserPerms(
      client,
      options.get("--user").split(":").at(1),
    );

    const to_perms = merge(
      options.get("--no-defaults")
        ? [fperms, cperms]
        : [dperms, fperms, cperms],
    );
    const from_perms = merge(targetUserPerms, sourceUserPerms);
    const canon_perms = await getCanonicalPerms(
      client,
      merge(from_perms, to_perms),
    );
    const from_to_perms = joinPerms(from_perms, to_perms, canon_perms);

    if (options.get("--dry-run")) {
      return options.get("--verbose")
        ? console.dir(from_to_perms, { depth: null })
        : console.dir(humanPerms(from_to_perms));
    }

    let update = true;
    if (options.get("--interactive")) {
      update = getclinput("Update dashboard permissions (y|n)? ", (input) =>
        /y/i.test(input),
      );
    }

    if (update) {
      await updateUserPerms(client, from_to_perms);
    }
  } finally {
    closeClientMongo();
  }
}

const optionsSchema = {
  help: {
    long: "--help",
    short: "-h",
  },
  verbose: {
    long: "--verbose",
    short: "-v",
  },
  ignoreDefault: {
    long: "--no-defaults",
    short: "-N",
  },
  dryRun: {
    long: "--dry-run",
    short: "-n",
  },
  fromFile: {
    long: "--from-file",
    short: "-f",
    flag: false,
  },
  user: {
    long: "--user",
    short: "-u",
    value: ":",
    flag: false,
  },
  perms: {
    long: "--perms",
    short: "-p",
    value: {},
    flag: false,
  },
  interactive: {
    long: "--interactive",
    short: "-i",
  },
};

function usage() {}
function getopts() {}
function merge() {}
function getDefaultPerms() {}
function getFilePerms() {}
function getUserPerms() {}
function getCanonicalPerms() {}
function joinPerms() {
  const permap = new Map();
  for (const [k, v] of Object.entries(merge(from_perms, to_perms))) {
    switch (k) {
      case "permissions":
      case "countries":
      case "dashboardPermissions":
      case "extraPermissions":
      case "needsApproval":
      default:
        throw new Error(`Unknown permission key: '${k}'`);
    }
  }
}
function humanPerms() {}
function getclinput() {}
function updateUserPerms() {}
