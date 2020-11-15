const assert = require("assert");

const { DB_COLLECTION } = require("./constants");
const { getDB } = require("./db");

async function retrieve() {
  const db = await getDB();
  const collection = db.collection(DB_COLLECTION);

  return collection.find({}).toArray();
}

module.exports = retrieve;
