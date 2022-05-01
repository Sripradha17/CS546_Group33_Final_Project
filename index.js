const configRoutes = require("./routes");

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const { createTextIndexes, createFakeData } = require("./config");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "hbs");

configRoutes(app);

app.listen(3000, () => {
  createTextIndexes();
  createFakeData();
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
