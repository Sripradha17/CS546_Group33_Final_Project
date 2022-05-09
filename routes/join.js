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
        res.sendStatus(500).redirect("/join",{error: e});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hostgame = await hostData.get(req.params.id);

        res.render('join', { title: "Hosted game list",hostgame })
    } catch (e) {
        res.sendStatus(500).redirect(`/join/${req.params.id}`,{error: e});
    }
});

router.post('/:id', async (req, res) => {

    const players = req.session.user.username;
    console.log(players.username)

    try {
        const updatePlayground = await joinData.updatePlayers(req.params.id, players);
    } catch (e) {
       
        res.status(400).redirect(`/join/${req.params.id}`,{error: e});
    }
});

module.exports = router;

