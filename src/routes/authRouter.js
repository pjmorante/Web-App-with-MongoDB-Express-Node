const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const passport = require("passport");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  //Create user
  const { username, password } = req.body;
  const url =
    "mongodb+srv://chejo:12345678pjm@cluster0.4lsxn.mongodb.net?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the MongoDB");

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);

      req.login(results.ops, () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      console.log(error);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signIn");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureMessage: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
