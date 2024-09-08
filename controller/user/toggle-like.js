const Post = require('../../models/Post')
const User = require('../../models/User')
const asyncWrapper = require('../../middleware/async');
const { CustomAPIError } = require('../../errors/custom-error');

const toggleLike = asyncWrapper(async (req, res, next) => {
    const { id } = req.user;

    const { postId } = req.body;
    console.log(req.body)
    console.log("This is postId", postId)

    const post = await Post.findOne({ _id: postId, isDeleted: false });
    console.log(post);
    if (!post) {
        return next(new CustomAPIError("Post doesn't Exist", 404))
    }

    if (post.likes.includes(id)) {
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: id }
        });
        return res.status(200).json({ success: true, message: "Successfully removed the like" })
    }
    else {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: id }
        })
        return res.status(200).json({ success: true, message: "SuccessFully Liked the Post" })
    }

})

module.exports = toggleLike