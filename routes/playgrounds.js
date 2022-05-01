const playgroundsController = require('../controllers/playgrounds');
const gamesController = require('../controllers/games');
const commentsController = require('../controllers/comments');
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const playgrounds = await playgroundsController.searchPlaygrounds();
    const hostedGames = await gamesController.getHostedGames();

    res.render("home", { playgrounds: playgrounds, sportWatchingEvents: hostedGames, title: "Play More" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/filter", async (req, res) => {
  try {
    const date = req.query.date;
    const searchTerm = req.query.search;

    const playgrounds = await playgroundsController.searchPlaygrounds({ searchTerm, date });
    const hostedGames = await gamesController.getHostedGames();

    res.render("home", {
      playgrounds,
      sportWatchingEvents: hostedGames,
      date: date,
      title: "Play More"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/playground/:id", async (req, res) => {
  try {
    const playground = await playgroundsController.getPlaygroundById(req.params.id);
    const comments = await commentsController.getCommentsByPlaygroundId(req.params.id);

    res.render("playground", { playground, comments, title: playground.playgroundName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/playground/:id/comment", async (req, res) => {
  try {
    const comment = req.body.comment;
    const playgroundId = req.params.id;

    await commentsController.addComment(comment, playgroundId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/:id/comment/:commentId/like", async (req, res) => {
  try {
    const playgroundId = req.params.id;
    const commentId = req.params.commentId;

    await commentsController.likeComment(commentId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/playground/:id/comment/:commentId/dislike", async (req, res) => {
  try {
    const playgroundId = req.params.id;
    const commentId = req.params.commentId;

    await commentsController.dislikeComment(commentId);

    res.redirect(`/playground/${playgroundId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;