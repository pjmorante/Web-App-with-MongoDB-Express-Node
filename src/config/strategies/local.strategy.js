const { MongoClient } = require("mongodb");
const passport = require("passport");
const { Strategy } = require("passport-local");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
          "mongodb+srv://chejo:12345678pjm@cluster0.4lsxn.mongodb.net?retryWrites=true&w=majority";
        const dbName = "globomantics";
        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            console.log("Connected to the MongoDB");

            const db = client.db(dbName);
            const user = await db.collection("users").findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
