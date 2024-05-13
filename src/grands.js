import { getClientMongo } from "../src/getClientMongo.js";
import { unique } from "js_utils/misc";

const USER_NAME = "pavlos noulis";

const permap = {
  permissions: {
    pages: new Map(),
    tabs: new Map(),
  },
  extraPermissions: new Map([
    ["productsWithSubstitutionsAndTotalProducts", { from: null, to: true }],
    ["mtd_shopLaunched", { from: null, to: true }],
    ["cloudWatchLogs", { from: null, to: true }],
    ["tarreport", { from: null, to: true }],
    ["bannedUsers", { from: null, to: true }],
    ["capacityStats", { from: null, to: true }],
    ["viewNofCreatedProducts", { from: null, to: true }],
    ["orderLogs", { from: null, to: true }],
    ["massShopManagementLogs", { from: null, to: true }],
    ["editMap", { from: null, to: true }],
    ["exportAreaEmails", { from: null, to: true }],
    ["createNewDistrict", { from: null, to: true }],
    ["viewClientAreaLogs", { from: null, to: true }],
    ["HDHealthReport", { from: null, to: true }],
    ["HD3DAuthorizations", { from: null, to: true }],
    ["HDMessagesAverageTime", { from: null, to: true }],
    ["HDTotalMessagesReceived", { from: null, to: true }],
    ["HDLocationRequests", { from: null, to: true }],
    ["HDProductsStats", { from: null, to: true }],
    ["HDFailedLogins", { from: null, to: true }],
    ["HDScheduledOrdersOneTime", { from: null, to: true }],
    ["HDFailedTokenAuthorizations", { from: null, to: true }],
    ["HDLoginCalls", { from: null, to: true }],
    ["HDLoginSMS", { from: null, to: true }],
    ["HDSearchIndexing", { from: null, to: true }],
    ["HDPosTransactions", { from: null, to: true }],
    ["errorloggers", { from: null, to: true }],
    ["HDAppRatingPush", { from: null, to: true }],
    ["HDLocationRequestsUsersNotified", { from: null, to: true }],
    ["HDRecipesPerformance", { from: null, to: true }],
    ["HDSearchSuccess", { from: null, to: true }],
    ["HDSubstitutionJobs", { from: null, to: true }],
    ["HDAwarenessSystems", { from: null, to: true }],
    ["HDArtemis", { from: null, to: true }],
    ["HDSubstitutionCalls", { from: null, to: true }],
    ["HDOrderReminders", { from: null, to: true }],
    ["HDSubstitutionEmails", { from: null, to: true }],
    ["HDProductReminders", { from: null, to: true }],
    ["HDScheduledOrdersWeeklyMonthly", { from: null, to: true }],
    ["HDScheduledOrdersWithServiceFee", { from: null, to: true }],
    ["HDInstallations", { from: null, to: true }],
    ["HDSearch", { from: null, to: true }],
    ["HDProductsRequests", { from: null, to: true }],
    ["HDReports", { from: null, to: true }],
    ["HDSuccessfulOnlineTransactions", { from: null, to: true }],
    ["HDFailedOnlineTransactions", { from: null, to: true }],
    ["HDSuccessfulTokenAuthorizations", { from: null, to: true }],
    ["DevicesPendingApprovalClientTab", { from: null, to: true }],
    ["qaScoreboard", { from: null, to: true }],
    ["fastCacheManagement", { from: null, to: true }],
    ["updateClientDisplayPriority", { from: null, to: true }],
    ["capacityAwarenessReport", { from: null, to: true }],
    ["canAccessIP", { from: null, to: true }],
    ["editOrderCoupons", { from: null, to: true }],
  ]),
  dashboardPermissions: {
    from: {},
    to: [
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "CmA9q99UTf",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "kp41wgK0Jg",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "YJsrLBkG41",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "XCGU2DzPv0",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "V62PTRZDE9",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "7WJSEEQ3F6",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "F238YyyA6t",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "mVGNGMwSs6",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "xNAsEbgF2g",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "qx8XQ1iZS4",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "DxkqMn2EIl",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "qZ84clhxH3",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "B4NMPfcqoA",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "ScCschejUR",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "CQCxI2l1rH",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "UTWDNvm1aS",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "yqBFLNQ6Yi",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "RDHIgbm5tb",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "8ra9KE8Hb4",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "uTwcDyCwJC",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "CFpmxx0xcC",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "XHhvcc3JMM",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "OnLqg5D40y",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "S1luMykUt1",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Q7xwwzzJvP",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "j5pV5py85p",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "thRozRDMna",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "1DYPoBNOfY",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Fj6il2DRqk",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "WgbnqNO7dg",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "HlnrvxqrV4",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Kbxj0jteGK",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "xD1RPkDmu5",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "wxJoCDoayg",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "vVyJ9iCy3A",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "oT9y1Lac3z",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "8upmGxsYcM",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "5WMI6Ih5Nr",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "0x3oqD4HOJ",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "XGYdqK4S0Z",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "DvmVeKgS1D",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "7D0ItuP3eD",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "B8tcJIWfEs",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "AfaWEMMhXC",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "TaTE15bdYj",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "NUuBy6NaI0",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "gMfyPAX6VX",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "SKjEaLl9N4",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "95hJFBtzNj",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "vwEtm3HU3u",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "MPttPjkoAd",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Y2yZfninp0",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "pRxQCAf7Nl",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Yqg3Be4byJ",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "4a0fnsFfsH",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "p5vlcMs79d",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "L4CrLiDaxw",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Rl8Y7D3ZiL",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "Rcw1yF2wOm",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "HInekaXrxN",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "KKMPziBiCd",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "CFpmxx0xcC",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "33KweY5GCE",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "O4E8MttwWc",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "NvbFIFUn7c",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "iQOClyfOam",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "HYFtQZmYZj",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "u0wHYkWGyK",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "OcgsQeFI81",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "j8y8EjDfGS",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "fKqy4VvOYk",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "jXqvua5ALM",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "75cgkhOIOW",
      },
      {
        __type: "Pointer",
        className: "DashboardPermissions",
        objectId: "nU2gdKvDEG",
      },
    ],
  },
  needsApproval: {
    from: null,
    to: false,
  },
  countries: {
    from: [],
    to: [
      {
        __type: "Pointer",
        className: "DashboardCountries",
        objectId: "YD2EEMGO8r",
      },
    ],
  },
};

async function main() {
  const client = await getClientMongo({
    url: process.env.MONGO_URL,
    db: process.env.MONGO_DB_NAME,
  });

  const tblDashboardLogin = await getClientMongo({
    collection: "DashboardLogin",
  });

  const tblDashboardPermissions = await getClientMongo({
    collection: "DashboardPermissions",
  });

  const tblDashboardCountries = await getClientMongo({
    collection: "DashboardCountries",
  });

  const user = await tblDashboardLogin.findOne(
    {
      name: { $regex: USER_NAME, $options: "i" },
    },
    {
      projection: {
        _id: 1,
        permissions: 1,
        dashboardPermissions: 1,
        extraPermissions: 1,
        needsApproval: 1,
        countries: 1,
      },
    },
  );

  if (!user) {
    throw new Error(`Missing user: '${USER_NAME}'`);
  }

  makePagesPerm(permap.permisisons.pages, user);
  makeTabsPerm(permap.permissions.tabs, user);
  makeExtraPerm(permap, user);
  await makeCountriesPerm(permap, tblDashboardCountries, user);
  await makeDashboardPerm(permap, tblDashboardPermissions, user);
}

function makePagesPerm(permap, user) {
  // Permissions.pages
  for (const page of Object.entries(user.permissions.pages)) {
    permap.pages.set(page[0], { from: page[1], to: true });
  }
}
function makeTabsPerm(permap, user) {
  // Permissions.tabs
  for (const tab of Object.entries(user.permissions.tabs)) {
    permap.tabs.set(tab[0], { from: tab[1], to: true });
  }
}
async function makeCountriesPerm(permap, datasource, user) {
  // Permissions.Countries
  permissions.countries.from = user.countries.map(
    (country) => country.objectId,
  );
  for (const country of user.countries) {
    if (permissions.countries.to.find((c) => c.objectId === country.objectId)) {
      continue;
    }
    permissions.countries.to.push(country);
  }
  permissions.countries.to = await Promise.all(
    permissions.countries.to.map((country) =>
      tblDashboardCountries
        .findOne({ _id: country.objectId })
        .then(
          (document) =>
            document || new Error(`Missing country: '${country.objectId}'`),
        ),
    ),
  );
}
function makeNeedsApprovalPerm(permap, user) {
  // Permissions.needsApproval
  permissions.needsApproval.from = user.needsApproval;
}
async function makeExtraPerm(permap, user) {
  // Permissions.extraPermissions
  for (const extra of Object.entries(user.extraPermissions)) {
    const permission = permissions.extraPermissions.get(extra[0]);
    permission.from = extra[1];
  }
}
async function makeDashboardPerm(permap, datasource, user) {
  // Permissions.dashboardPermissions
  permissions.dashboardPermissions.from = user.dashboardPermissions.map(
    (permission) => permission.objectId,
  );
  for (const permission of user.dashboardPermissions) {
    if (
      permissions.dashboardPermissions.to.find(
        (p) => p.objectId === permission.objectId,
      )
    ) {
      continue;
    }
    permissions.dashboardPermissions.to.push(permission);
  }
  permissions.dashboardPermissions.to = await Promise.all(
    permissions.dashboardPermissions.to.map((permission) =>
      tblDashboardPermissions
        .findOne({ _id: permission.objectId })
        .then(
          (document) =>
            document ||
            new Error(`Missing dashboard permission: '${permission.objectId}'`),
        ),
    ),
  );
}

function dryRun(permissions) {
  permissions.dashboardPermissions.to = permissions.dashboardPermissions.to.map(
    (permission) => permission.title,
  );
  permissions.countries.to = permissions.countries.to.map(
    (country) => country.name,
  );

  console.dir(permissions, { depth: null });
}

function setPermissions(tblDashboardLogin, userId, perms) {
  const perms = Object.entries(permissions).reduce((car, [k, v]) => {
    switch (k) {
      case "permissions":
        car.pages = {};
        Array.from(v.pages.entries()).forEach(
          ([_k, _v]) => (car.pages[_k] = _v.to),
        );
        car.tabs = {};
        Array.from(v.tabs.entries()).forEach(
          ([_k, _v]) => (car.tabs[_k] = _v.to),
        );
        break;
      case "countries":
        car.countries = v.to.map((country) => ({
          __type: "Pointer",
          className: "DashboardCountries",
          objectId: country._id,
        }));
        break;
      case "dashboardPermissions":
        car.dashboardPermissions = v.to.map((permission) => ({
          __type: "Pointer",
          className: "DashboardPermissions",
          objectId: permission._id,
        }));
        break;
      default:
        if (v instanceof Map) {
          car[k] = {};
          for (const [_k, _v] of v.entries()) {
            car[k][_k] = _v.to;
          }
        } else {
          car[k] = v.to;
        }
    }
    return car;
  }, {});

  tblDashboardLogin.updateOne(
    { _id: userId },
    {
      $set: Object.entries(perms).reduce((car, [k, v]) => {
        car[k] = v.to;
      }, {}),
    },
  );
}

// dryRun(permissions);

main();
