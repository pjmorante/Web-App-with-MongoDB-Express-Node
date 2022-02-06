const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const sessions = require("../data/sessions.json");
const sessionRouter = express.Router();

sessionRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

sessionRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://chejo:12345678pjm@cluster0.4lsxn.mongodb.net?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the MongoDB");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      console.log(error.stack);
    }
    client.close();
  })();
});

sessionRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://chejo:12345678pjm@cluster0.4lsxn.mongodb.net?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the MongoDB");

      const db = client.db(dbName);

      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectID(id) });
      res.render("session", {
        session,
      });
    } catch (error) {
      console.log(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionRouter;
