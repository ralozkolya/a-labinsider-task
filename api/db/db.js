const MongoClient = require("mongodb").MongoClient;

const { DB_HOST, DB_PORT, DB_NAME } = require("./constants");

let client;

function getClient() {
  if (client) {
    return client;
  }

  client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
    useUnifiedTopology: true,
  });

  return client.connect();
}

async function getDB(name) {
  const client = await getClient();
  return client.db(name || DB_NAME);
}

module.exports = { getClient, getDB };
