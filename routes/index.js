const userRoutes = require('./user');
const hostRoutes = require('./host');
const session = require('express-session')
const data = require('../data');
const playgroundRoutes = require("./playgrounds");
const eventsRoutes = require("./events");
const showData = data.user;

const constructorMethod = (app) => {

  app.use("/user", userRoutes);
  app.use("/host", hostRoutes);
  app.use(playgroundRoutes);
  app.use(eventsRoutes);

  const Logging =async (req, res,next) =>  {
    console.log(`[${new Date().toUTCString()}]: ${req.method}\t${req.originalUrl}\t\t${!!req.session.user ? 'Authenticated' : 'Not Authenticated'}`);
    next()
  };

  app.use(Logging);
  app.get("/", (req, res) => {
    let userLoggedIn = false;
    let userId = req.session.user;
    if(!!userId) {
      res.redirect('/user/private')
      userLoggedIn = false;
    } else {
      res.render('login', { title: "Login" ,userLoggedIn: true})
      
    }

    res.status(200).render("index", {userLoggedIn: userLoggedIn});
  });
  // app.use('/', userRoutes);
 
  app.use("*", (request, response) => {
    response.status(404).json({ error: "Route not found" });
  });

};

module.exports = constructorMethod;