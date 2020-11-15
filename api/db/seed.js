const Promise = require("bluebird");
const faker = require("faker");

const { DB_COLLECTION, DB_NAME } = require("./constants");
const { getClient } = require("./db");

const COUNT = parseInt(process.env.COUNT) || 60;

getClient().then(async (client) => {
  const db = client.db(DB_NAME);
  const collection = db.collection(DB_COLLECTION);

  await collection.drop();

  Promise.each(Array(COUNT).fill(1), async (_, i) => {
    const facility = {
      name: faker.company.companyName(),
      city: faker.address.city(),
      country: faker.address.country(),
      director: faker.name.findName(),
    };

    await collection.insertOne(facility);

    console.log(`Successfully added: ${i} - ${facility.name}`);
  }).finally(() => client.close());
});
