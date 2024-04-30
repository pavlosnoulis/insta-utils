import { getClientParseInstadata } from "insta-utils";

const client = getClientParseInstadata({
  serverUrl: process.env.PARSE_SERVER_URL,
  appId: process.env.PARSE_APP_ID,
  jsKey: process.env.PARSE_JS_KEY,
  masterKey: process.env.PARSE_MASTER_KEY,
});

try {
  const res = await new client.Query("Messages")
    .equalTo("objectId", "onetwothree")
    .first({
      useMasterkey: true,
    });
  console.log(res);
} catch (err) {
  console.log(err);
}
