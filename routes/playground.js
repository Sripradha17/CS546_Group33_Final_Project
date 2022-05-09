const playground = require("../data/playground");
const search = require("../data/search");
const HostedGame = require("../data/host");
const Comments = require("../data/comment");
const { Router } = require("express");
const validation = require("../data/validation");
var fs = require("fs");
var path = require("path");
const router = Router();


//route on click or select of playground
router.post("/playground", async (req, res) => {
  try {
    const playgrounds = await search.filterPlaygrounds();

    res.render("playground", {
      playgrounds: playgrounds,
      title: "Play More",
      user: req.session.user,
      userLoggedIn: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/playground", async (req, res) => {
  try {
    const playgrounds = await search.filterPlaygrounds();

    res.render("playground", {
      playgrounds: playgrounds,
      title: "Play More",
      user: req.session.user,
      userLoggedIn: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/add", async (req, res) => {
  try {
    res.render("addplayground", { title: "Add Playground", userLoggedIn: true });
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
});


var multer = require('multer');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage });

router.post('/playground/add', upload.single('image'), async (req, res) => {
  try {
    const playgroundName = validation.checkString(req.body.playgroundName, "Playground name");
    const schedule = validation.checkString(req.body.schedule, "Schedule");
    const playgroundSize = validation.checkString(req.body.playgroundSize, "Playground size");
    const location = validation.checkString(req.body.location, "Location");
    const amenities = validation.checkArray(req.body.amenities.split(" "), "Amenities");

    const imageData = 'http://localhost:3000/public/images/' + req.file.filename;
    console.log(imageData)


    const respData = await playground.createPlayground(playgroundName, schedule, amenities, playgroundSize, location, imageData);
    console.log("hhhh" + respData)
    res.redirect('/playground');

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/:id/edit", async (req, res) => {
  try {
    const playgrounds = await playground.getPlaygroundById(req.params.id);
    //   const comments = await Comments.getCommentsByPlaygroundId(req.params.id);

    res.render("editplayground", {
      playgrounds,
      title: playgrounds.playgroundName,
      user: req.session.user,
      userLoggedIn: req.session.user ? true : false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/playground/:id/edit", async (req, res) => {
  console.log("hhhh");
  try {
    const playgroundName = req.body.playgroundName;
    const schedule = req.body.schedule;
    const playgroundSize = req.body.playgroundSize;
    const location = req.body.location;
    const amenities = req.body.amenities.split(" ");
    console.log("hhhh2222");

    const updatePlayground = await playground.update(
      req.params.id,
      playgroundName,
      schedule,
      amenities,
      playgroundSize,
      location
    );
    res.redirect('/playground');
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
    const playgroundDoc = await playground.getPlaygroundById(req.params.id);
    const comments = await Comments.getCommentsByPlaygroundId(req.params.id);

    res.render("viewplayground", {
      playground: playgroundDoc,
      comments,
      title: playgroundDoc.playgroundName,
      user: req.session.user,
      userLoggedIn: req.session.user ? true : false,
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
      playgrounds,
      title: playgrounds.playgroundName,
      user: req.session.user,
      userLoggedIn: req.session.user ? true : false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/playground/:id/delete", async (req, res) => {
  console.log("kkkkkk" + req.params.id);
  try {
    const deletedAlbum = await playground.remove(req.params.id);
    res.redirect("/playground");
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

var multer = require("multer");
const { getUserByID } = require("../data/user");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

router.post("/playground/:id/comment", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/user/login");
    }

    const comment = req.body.comment;
    const playgroundId = req.params.id;

    const user = await getUserByID(req.session.user.username);

    await Comments.addComment(user._id, playgroundId, comment);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/:id/comment/:commentId/like", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/user/login");
    }

    const playgroundId = req.params.id;
    const commentId = req.params.commentId;

    await Comments.likeComment(commentId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/:id/comment/:commentId/dislike", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/user/login");
    }


    const playgroundId = req.params.id;
    const commentId = req.params.commentId;

    await Comments.dislikeComment(commentId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
