module.exports = {
  DB_HOST: process.env.MONGODB_HOST || 'localhost',
  DB_PORT: process.env.MONGODB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'a-labinsider',
  DB_COLLECTION: 'facilities',
};
