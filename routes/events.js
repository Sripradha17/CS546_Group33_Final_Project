const { createHostedGame } = require("../controllers/games");
const { Router } = require("express");

const router = Router();

router.post("/event", async (req, res) => {
    try {
        console.log(req.body);
        await createHostedGame({ ...req.body });
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/sport-event", async (req, res) => {
    try {
        res.render("sport-event");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;