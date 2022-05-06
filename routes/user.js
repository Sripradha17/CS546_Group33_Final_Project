const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.user;
const hostData = data.host;


router.get('/login', async (req, res) => {
    try {
        if (!!req.session.user) {
            res.redirect('/user/private')
        } else {
            res.render('login', { title: "Login" })
        }
    } catch (e) {
        res.sendStatus(500);
    }
});
router.get('/profile', async (req, res) => {
    try {
        if (!!req.session.user) {
            res.redirect('/user/private')
        } else {
            res.render('profile', { title: "Profile" })
        }
    } catch (e) {
        res.sendStatus(500);
    }
});


router.get('/private', async (req, res, next) => {

    try {
        res.render('private', { title: "Information", userLoggedIn: true })
    } catch (error) {
        res.sendStatus(500);
    }

});

router.post('/login', async (req, res) => {
    try {
        if (!!req.session.user) {
            res.redirect('/user/private')
        }

        let user = req.body.loginradio;
        // let host = req.body['loginradio'];



        const username = req.body['username'];
        const password = req.body['password'];

        let userInfo;
        if (username == "admin") {
            res.redirect('/user/private')
            
        } else {
            if (user == "user") {
                userInfo = await showData.checkUser(username, password);
            }
            else {
                userInfo = await hostData.checkUser(username, password);
            }
        }




        if (userInfo.authenticated) {
            req.session.user = { username: username };
            res.redirect('/user/private')
        } else {
            res.status(400);
            res.render('login', { title: "Error", error: "Invalid Username and/or Password" })
        }
    } catch (e) {

        res.status(400);
        res.render('login', { error: e });
    }

});

router.post('/signup', async (req, res) => {
    try {
        if (!!req.session.user) {
            res.redirect('/user/private')
        }
        const firstname = req.body['firstname'];
        const lastname = req.body['lastname'];
        const username = req.body['username'];
        const email = req.body['email'];
        const password = req.body['password'];
        const confirm_password = req.body['confirm_password'];

        let user = req.body.loginradio;

        console.log(user)
        let userInfo;
        if (user == "host") {
            userInfo = await hostData.createHostUser(firstname, lastname, username, email, password, confirm_password);

        }
        else {
            userInfo = await showData.createUser(firstname, lastname, username, email, password, confirm_password);

        }

        if (userInfo.userInserted) {
            res.redirect('/')
        } else {
            res.status(500);
            res.render('signup', { title: "Error", error: "Internal Server Error" })
        }
    } catch (e) {
        res.status(400);
        res.render('signup', { error: e });
    }

});

router.get('/signup', async (req, res) => {

    try {
        if (!!req.session.user) {
            res.redirect('/user/private')
        } else {
            res.render('signup', { title: "Signup" })
        }
    } catch (e) {
        res.status(400);
    }

});

router.get('/logout', function (req, res) {
    try {
        req.session.destroy();
        res.render('login', { title: "Login" })

    } catch (e) {
        res.status(400);
    }

});

module.exports = router;