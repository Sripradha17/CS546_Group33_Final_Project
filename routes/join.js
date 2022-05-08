
const express = require('express');
const router = express.Router();
const data = require('../data');
const joinData = data.join;
const hostData = data.host;

router.get('/', async (req, res) => {
    try {
        const hostgamelist = await hostData.getAll();

        res.render('viewhostedgame', { title: "Hosted game list",hostgamelist })
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hostgame = await hostData.get(req.params.id);

        res.render('join', { title: "Hosted game list",hostgame })
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id', async (req, res) => {
<<<<<<< HEAD
    const players = req.session.user.username;
    console.log(players.username)
=======
    console.log("hhhh")
    const players = req.session.user.username;
>>>>>>> 674acda57b335086b2e7f45467755724716def4a
    try {
        const updatePlayground = await joinData.updatePlayers(req.params.id, players);
    } catch (e) {
        if (e == "Error: No hosted game with this ID was found") {
            res.status(404).json({ error: e });
            return;
        }
        res.status(400).json({ error: e });
    }
});

module.exports = router;
