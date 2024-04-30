import { getClientHttpInstadata } from "insta-utils";

const client = getClientHttpInstadata("http://localhost:5000", {
  installationId: process.env.INSTALLATION_ID,
  instashopSessionToken: process.env.INSTASHOP_SESSION_TOKEN,
  parseSessionToken: process.env.PARSE_SESSION_TOKEN,
  hrUserId: process.env.HR_USER_ID,
});

try {
  const res = await client.get("dashboard-rest/messages");
  console.log(res);
} catch (err) {
  console.log(err);
}
