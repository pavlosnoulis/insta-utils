import { getClientParseInstadata } from "../src/getClientParseInstadata.js";

const client = getClientParseInstadata();

try {
  const res = await new client.Query("Messages")
    .equalTo("objectId", "JdtvEEKxky")
    .include("category")
    .first({ useMasterKey: true });

  console.log(res);
} catch (err) {
  console.log(err);
}
