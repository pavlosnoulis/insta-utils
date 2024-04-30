import process from "node:process";
import { MongoClient } from "mongodb";

let instance;

/**
 * @param {object} options
 * @param {string} options.url - Mongo connection string. if missing try process.env.MONGO_URL
 * @param {string} options.db - DB name. If missing try process.env.MONGO_DB_NAME;
 * @param {string} options.collection - DB table
 */
function getClientMongo({ url, db, collection } = {}) {
  url ||= process.env.MONGO_URL;

  if (collection) {
    db ||= process.env.MONGO_DB_NAME;
    return getClientMongo({ url, db }).then((client) =>
      client.collection(collection),
    );
  } else if (db) {
    return getClientMongo({ url }).then((client) =>
      client.db(db || process.env.MONGO_DB_NAME),
    );
  } else if (instance) {
    return Promise.resolve(instance);
  }

  instance = new MongoClient(url);
  return instance
    .connect()
    .then((client) => {
      console.log("Mongodb connected!");
      return client;
    })
    .catch((err) => {
      console.error("Failed to connect to Mongodb");
      throw err;
    });
}

function closeClientMongo() {
  return instance
    ?.close()
    .then(() => console.log("Mongodb connection closed!"));
}

export { getClientMongo, closeClientMongo };
