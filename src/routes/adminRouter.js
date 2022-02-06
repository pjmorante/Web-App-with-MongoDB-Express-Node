const express = require("express");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");

const adminRouter = express();

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://chejo:12345678pjm@cluster0.4lsxn.mongodb.net?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the MongoDB");

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      console.log(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
