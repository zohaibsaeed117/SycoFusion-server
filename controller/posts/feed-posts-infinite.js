const Post = require('../../models/Post')
const asyncWrapper = require('../../middleware/async')
const { CustomAPIError } = require('../../errors/custom-error')

const feedPostInfinite = asyncWrapper(async (req, res) => {


    const { id } = req.user

    const page = parseInt(req.query.page || 1)

    const limit = 5;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ isDeleted: false })
        .skip(skip)
        .limit(limit)
        .populate({
            path: "comments",
            populate: { path: "author", select:"firstName lastName avatar username" }
        })
        .populate({
            path: "author",
            select: "firstName lastName avatar username"
        })

    const postsWithLikes = posts.map(post => ({
        ...post.toObject(),
        isLiked: post.likes.includes(id), // Check if user ID is in the likes array
    }));

    if (posts.length === 0) {
        return res.status(200).json({ success: true, morePosts: false, message: "No more Posts" })
    }
    return res.status(200).json({ success: true, morePosts: true, posts: postsWithLikes })
})
module.exports = feedPostInfinite