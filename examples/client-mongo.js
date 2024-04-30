import { getClientMongo } from "insta-utils";

const client = await getClientMongo({
  url: process.env.MONGO_URL,
  db: process.env.MONGO_DB_NAME,
  collection: "Products",
});

client.findOne().then((record) => {
  console.log(record);
});
