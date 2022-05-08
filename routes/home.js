const home = require('../data/home');
const playground = require('../data/playground');
// const host = require('../data/host');
// const Comments = require('../data/comments');
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const playgrounds = await playground.searchPlaygrounds();

        res.render("home", {
            playgrounds: playgrounds,
            title: "Play More",
            user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
