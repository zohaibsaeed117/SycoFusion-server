const Post = require('../../models/Post')
const asyncWrapper = require('../../middleware/async');
const { CustomAPIError } = require('../../errors/custom-error');


const deletePost = asyncWrapper(async (req, res, next) => {

    const { postId } = req.params;

    const post = await Post.findById(postId)
    if (post.isDeleted) {
        return next(new CustomAPIError("Post doesn't Exists", 404))
    }

    if (!postId) {
        return next(new CustomAPIError("Post Field cannot be empty", 400))
    }

    await Post.findByIdAndUpdate(postId,
        { isDeleted: true }
    );

    return res.status(200).json({ success: true, message: "Your post has been deleted" })
})

module.exports = deletePost