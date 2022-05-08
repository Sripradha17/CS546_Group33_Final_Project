const express = require("express");
const router = express.Router();
const data = require('../data/');
const comments = data.comments;

router.get("/:id", async (req, res) => {
    try {
      const comment = await comments.getComment(req.params.id);
      res.status(200).render("comment", {commentText: comment.commentText})
    } catch (e) {
      res.status(404).json({ message: "Comment not found!" });
    }
});

router.get("/", async (req, res) => {
  console.log("in comments")
    try {
      const commentList = await comments.getAllComments();
      res.status(200).json(commentList)
    } catch (e) {
      
      console.log(e)
      res.status(404).send();
    }
});


router.post('/:commentId/like', async (req, res) => {
  console.log('asdasd', req.params)
  console.log('In like')
  try {
    await comments.likeComment(req.params.commentId);
    return res.redirect("/playground/" + req.body.playgroundId);
  } catch (error) {
    res.status(500).json({ error });
  }
})

router.post('/:commentId/dislike', async (req, res) => {
  console.log('asdasd', req.params)
  console.log('In like')
  try {
    await comments.dislikeComment(req.params.commentId);
    return res.redirect("/playground/" + req.body.playgroundId);
  } catch (error) {
    res.status(500).json({ error });
  }
})


router.post('/:userId/:playgroundId/add', async (req, res) => {
  console.log(req.params)
    if (!req.params.playgroundId || !req.params.userId) {
      res.status(400).json({ error: 'You must Supply an ID to add comment to!' });
      return;
	}
	const commentVal = req.body.commentValue;
    try {
      addCommentOnReview = await comments.addComment(req.params.userId, req.params.playgroundId, commentVal)
      if(addCommentOnReview){
        return res.redirect("/playground/" + req.params.playgroundId);
      } else {
        return res.status(404).send();
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.get('/:playgroundId/:commentId/delete', async (req, res) => {
	if (!req.params.commentId) {
		res.status(400).json({ error: 'You must Supply an ID to delete' });
		return;
	}
	try {
		await comments.getComment(req.params.commentId);
	} catch (e) {
		res.status(404).json({ error: 'Comment not found!' });
		return;
	}
	try {
    deleteCommentsFromReview = await comments.removeComment(req.params.commentId);
    if(deleteCommentsFromReview){
      return res.redirect("/playground/" + req.params.playgroundId);
    } else {
      return res.status(404).send();
    }
	} catch (e) {
		res.status(500).json({ error: e });
	}
});


module.exports = router;