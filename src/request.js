import { getClientMongo } from "inta-utils";

const client = await getClientMongo({
  url: process.env.MONGO_URL,
  db: process.env.MONGO_DB_NAME,
});

const tblProducts = await getClientMongo({ collection: "Products" });

tblProducts.findOne().then((record) => {
  console.log(record);
});
