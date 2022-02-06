const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const debug = require("debug")("app");

const PORT = process.env.PORT || 4001;
const app = express();
const sessionRouter = require("./src/routes/sessionsRouter");
const adminRouter = require("./src/routes/adminRouter");
const authRouter = require("./src/routes/authRouter");

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({ secret: "globomantics", resave: false, saveUninitialized: true })
);

require("./src/config/passport.js")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Globamantics" });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
