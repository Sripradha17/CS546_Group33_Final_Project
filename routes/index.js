const playgroundRoutes = require("./playgrounds");

const constructorMethod = (app) => {
  app.use(playgroundRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
