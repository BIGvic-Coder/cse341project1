// data/database.js

const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized!");
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGO_URI) // ✅ matches your .env and Render variable
    .then((client) => {
      database = client.db("portfolioDB"); // ✅ use your database name here
      console.log("Database connected!");
      callback(null, database);
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
