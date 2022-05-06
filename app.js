const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session')
const path = require('path');
const { createTextIndexes, createFakeData } = require("./config");


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));


configRoutes(app);

app.listen(3000, () => {
  createTextIndexes();
  createFakeData();
  console.log("Server is started");
  console.log('Your routes will be running on http://localhost:3000');
});