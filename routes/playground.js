const playground = require('../data/playground');
const search = require('../data/search');

const host = require('../data/host');
// const Comments = require('../data/comments');
const { Router } = require("express");
const validation = require('../data/validation');
var fs = require('fs');
var path = require('path');
const router = Router();


//route on click or select of playground
router.get("/playground", async (req, res) => {
    try {
        const playgrounds = await playground.searchPlaygrounds();
        let userLoggedIn = false;
        if (req.session.user) {
            username = req.session.user.username;
            userLoggedIn = true;
        } else {
            userLoggedIn = false;
        }
        console.log(userLoggedIn)
        res.render("playground", {
            playgrounds: playgrounds,
            title: "Play More",
            user: req.session.user,
            userLoggedIn: userLoggedIn
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/playground/add", async (req, res) => {
    try {
        res.render("addplayground", { title: "Add Playground" })
    } catch (e) {
        res.sendStatus(500);
    }
});

var multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});

var upload = multer({ storage: storage });

router.post('/playground/add', upload.single('image'), async (req, res) => {
    const playgroundName = validation.checkString(req.body.playgroundName, "Playground name");
    const schedule = validation.checkString(req.body.schedule, "Schedule");
    const playgroundSize = validation.checkString(req.body.playgroundSize, "Playground size");
    const location = validation.checkString(req.body.location, "Location");
    const amenities = validation.checkArray(req.body.amenities.split(" "), "Amenities");
    console.log("hhhh")
    const imageData = '../public/images/'+ req.file.filename;
    console.log(imageData)

    try {
        const respData = await playground.createPlayground(playgroundName, schedule, amenities, playgroundSize, location, imageData);
        res.redirect('/playground/add');

        if (respData) {
            return res.json(data)
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/playground/:id/edit", async (req, res) => {
    try {
        const playgrounds = await playground.getPlaygroundById(req.params.id);
        //   const comments = await Comments.getCommentsByPlaygroundId(req.params.id);

        res.render("editplayground", {
            playgrounds, title: playgrounds.playgroundName, user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/playground/:id/edit", async (req, res) => {

    console.log("hhhh")
    const playgroundName = req.body.playgroundName;
    const schedule = req.body.schedule;
    const playgroundSize = req.body.playgroundSize;
    const location = req.body.location;
    const amenities = req.body.amenities.split(" ");
    console.log("hhhh2222")
    try {
        const updatePlayground = await playground.update(req.params.id, playgroundName, schedule, amenities, playgroundSize, location);
    } catch (e) {
        if (e == "Error: No playground with this ID was found") {
            res.status(404).json({ error: e });
            return;
        }

        res.status(400).json({ error: e });
    }
});

router.get("/playground/:id", async (req, res) => {
    try {
        const playgrounds = await playground.getPlaygroundById(req.params.id);
        //   const comments = await Comments.getCommentsByPlaygroundId(req.params.id);
        res.render("viewplayground", {
            playgrounds, title: playgrounds.playgroundName, user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/playground/:id/delete", async (req, res) => {
    try {
        const playgrounds = await playground.getPlaygroundById(req.params.id);
        //   const comments = await Comments.getCommentsByPlaygroundId(req.params.id);

        res.render("deleteplayground", {
            playgrounds, title: playgrounds.playgroundName, user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/playground/:id/delete', async (req, res) => {
    console.log("kkkkkk" + req.params.id)
    try {
        const deletedAlbum = await playground.remove(req.params.id);
        res.redirect('/playground')
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

router.get("/filter", async (req, res) => {
    try {
        const date = req.query.date;
        const searchTerm = req.query.search;
        const minPlaygroundSize = req.query.minPlaygroundSize;
        const maxPlaygroundSize = req.query.maxPlaygroundSize;
        const amenities = req.query.amenities;

        const playgrounds = await playground.searchPlaygrounds({ searchTerm, date, minPlaygroundSize, maxPlaygroundSize, amenities });
        const hostedGames = await host.getAll();

        res.render("home", {
            playgrounds,
            sportWatchingEvents: hostedGames,
            date: date,
            searchTerm: searchTerm,
            minPlaygroundSize: minPlaygroundSize,
            maxPlaygroundSize: maxPlaygroundSize,
            amenities: amenities,
            title: "Play More",
            user: req.session.user,
            userLoggedIn: req.session.user ? true : false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;
