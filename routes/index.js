const playgroundRoutes = require("./playgrounds");
const eventsRoutes = require("./events");

const constructorMethod = (app) => {
  app.use(playgroundRoutes);
  app.use(eventsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
