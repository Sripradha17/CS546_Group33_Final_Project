const Playgrounds = require('../data/playgrounds');
const Host = require('../data/host');
const Comments = require('../data/comments');
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

router.get("/filter", async (req, res) => {
  try {
    const date = req.query.date;
    const searchTerm = req.query.search;

    const playgrounds = await Playgrounds.searchPlaygrounds({ searchTerm, date });
    const hostedGames = await Host.getHostedGames();

    res.render("home", {
      playgrounds,
      sportWatchingEvents: hostedGames,
      date: date,
      title: "Play More",
      user: req.session.user,
      userLoggedIn: req.session.user ? true : false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/playground/:id", async (req, res) => {
  try {
    const playground = await Playgrounds.getPlaygroundById(req.params.id);
    const comments = await Comments.getCommentsByPlaygroundId(req.params.id);

    res.render("playground", {
      playground, comments, title: playground.playgroundName, user: req.session.user,
      userLoggedIn: req.session.user ? true : false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/playground/:id/comment", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/user/login");
    }

    const comment = req.body.comment;
    const playgroundId = req.params.id;

    await Comments.addComment(comment, playgroundId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
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