const home = require('../data/home');
const Playgrounds = require('../data/playground');
const Host = require('../data/hosted_game');
// const Comments = require('../data/comments');
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const playgrounds = await Playgrounds.searchPlaygrounds();
        const hostedGames = await Host.getHostedGames();

        res.render("home", {
            playgrounds: playgrounds,
            sportWatchingEvents: hostedGames,
            title: "Play More",
            user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
