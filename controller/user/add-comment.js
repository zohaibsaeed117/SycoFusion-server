const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const asyncWrapper = require('../../middleware/async');
const { CustomAPIError } = require('../../errors/custom-error');

const addComment = asyncWrapper(async (req, res, next) => {
    const { postId, message } = req.body;
    const { id } = req.user


    if (!message) {
        return next(new CustomAPIError("Reply Should not be Empty", 400));
    }

    const comment = new Comment({
        author: id,
        postId: postId,
        message: message
    })

    await comment.save();

    await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment._id } }, // Add the comment ID to the comments array
        { new: true } // Return the updated document
    );

    return res.status(201).json({ success: true, message: "Your comment has been added" });

})

module.exports = addComment