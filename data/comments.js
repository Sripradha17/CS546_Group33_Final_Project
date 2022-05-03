const { ObjectId } = require("mongodb")
const { comment: Comments } = require('../config/mongoCollections');

const getCommentsByPlaygroundId = async (playgroundId) => {
    const commentsCollection = await Comments();
    const comments = await commentsCollection.find({ playgroundId: playgroundId }).sort({ createdAt: -1 }).toArray();
    return comments;
}

const addComment = async (comment, playgroundId) => {
    const commentsCollection = await Comments();
    const newComment = await commentsCollection.insertOne({
        comment: comment,
        playgroundId: playgroundId,
        createdAt: new Date(),
    });
    if (newComment.insertedCount === 0) throw "Could not add comment";
    return newComment;
}

const likeComment = async (commentId) => {
    const commentsCollection = await Comments();
    const updatedComment = await commentsCollection.updateOne({
        _id: ObjectId(commentId)
    }, {
        $inc: {
            likes: 1
        }
    });
    if (updatedComment.modifiedCount === 0) throw "Could not like comment";
    return updatedComment;
}

const dislikeComment = async (commentId) => {
    const commentsCollection = await Comments();
    const updatedComment = await commentsCollection.updateOne({
        _id: ObjectId(commentId)
    }, {
        $inc: {
            dislikes: 1
        }
    });
    if (updatedComment.modifiedCount === 0) throw "Could not dislike comment";
    return updatedComment;
}

module.exports = {
    getCommentsByPlaygroundId,
    addComment,
    likeComment,
    dislikeComment
}