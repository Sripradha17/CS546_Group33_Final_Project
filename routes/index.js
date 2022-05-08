const homeRoutes = require('./home');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const hostRoutes = require('./host');
const joinRoutes = require('./join');
const session = require('express-session')
const data = require('../data');
const playgroundRoutes = require("./playground");
// const eventsRoutes = require("./events");
const showData = data.user;

const constructorMethod = (app) => {
  // app.use("/", homeRoutes);
  app.use("/admin", adminRoutes);
  app.use("/user", userRoutes);
  app.use("/host", hostRoutes);
  app.use("/join", joinRoutes);
  app.use("/", playgroundRoutes);
  //   app.use(eventsRoutes);

  const Logging = async (req, res, next) => {
    console.log(`[${new Date().toUTCString()}]: ${req.method}\t${req.originalUrl}\t\t${!!req.session.user ? 'Authenticated' : 'Not Authenticated'}`);
    next()
  };

  app.use(Logging);
  app.get("/", (req, res) => {
    let userLoggedIn = false;
    let userId = req.session.user;
    

    res.status(200).render("home", { userLoggedIn: userLoggedIn });
  });


  app.use("*", (request, response) => {
    res.redirect('/user/private')
  });

};

module.exports = constructorMethod;