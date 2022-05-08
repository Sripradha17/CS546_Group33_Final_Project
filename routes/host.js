const express = require('express');
const router = express.Router();
const data = require('../data');
const hostData = data.host;


router.get('/', async (req, res) => {

    try {

        const playgrounds = await hostData.getallplayground();
        res.render('host', {
            title: "Host", playgrounds: playgrounds,
            userLoggedIn: true
        })

    } catch (e) {
        res.sendStatus(500);
    }
});
// router.get("/", async (req, res) => {
//     try {
//         const playgrounds = await playground.searchPlaygrounds();

//         res.render("playground", {
//             playgrounds: playgrounds,
//             title: "Play More",
//             user: req.session.user,
//             userLoggedIn: req.session.user ? true : false
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })
router.post('/', async (req, res) => {
    try {
        // if (!!req.session.user) {
        //     res.redirect('/user/private')
        // }
        const sportname = req.body['sportname'];
        const adress = req.body['adress'];
        const date = req.body['date'];
        const slot = req.body['slot'];
        const detail = req.body['detail'];

        let host = await hostData.createHost(sportname, adress, date, slot, detail);


        // if (userInfo.authenticated) {
        //     req.session.user = { username: username };
        //     res.redirect('/user/private')
        // } else {
        //     res.status(400);
        //     res.render('login', { title: "Error", error: "Invalid Username and/or Password" })
        // }
    } catch (e) {

        res.status(400);
        res.render('login', { error: e });
    }

});



module.exports = router;