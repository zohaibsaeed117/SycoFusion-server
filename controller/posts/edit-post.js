const Post = require("../../models/Post")
const asyncWrapper = require("../../middleware/async")
const { CustomAPIError } = require("../../errors/custom-error")

const editPost = asyncWrapper(async (req, res, next) => {

    const { postId, caption } = req.body

    if (!postId) {
        return next(new CustomAPIError("Invalid Post Id", 400))
    }

    const post = await Post.findById(postId)
    if (!post || post.isDeleted) {
        return next(new CustomAPIError("Post Not found",404))
    }


    await Post.findByIdAndUpdate(postId,
        {
            caption: caption
        }
    );

    return res.status(200).json({ success: true, message: "Your post has been updated" })

})

module.exports = editPost;