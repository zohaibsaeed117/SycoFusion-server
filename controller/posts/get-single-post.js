const Post = require("../../models/Post");
const asyncWrapper = require('../../middleware/async')
const { CustomAPIError } = require('../../errors/custom-error');
const getSinglePost = asyncWrapper(async (req, res, next) => {

    const { postId } = req.params;

    const { id } = req.user;

    const post = await Post.findById(postId).populate({
        path: "comments",
        populate: { path: "author", select: "username" }
    })
        .populate('author', 'username');


    const newPost = { ...post.toObject(), isLiked: post.likes.includes(id) };

    if (!post) {
        return next(new CustomAPIError("Post Not Found", 404))
    }
    res.status(200).json({ success: true, post: newPost })
})

module.exports = getSinglePost
