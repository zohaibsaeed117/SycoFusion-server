const Post = require('../../models/Post')
const User = require('../../models/User')
const asyncWrapper = require('../../middleware/async')
const { CustomAPIError } = require('../../errors/custom-error')

const feedPostInfinite = asyncWrapper(async (req, res) => {

    const { id } = req.user

    const { following } = await User.findById(id).select('following');
    console.log(following)

    const page = parseInt(req.query.page || 1)

    const limit = 5;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ isDeleted: false, author: { $in: following } })
        .skip(skip)
        .limit(limit)
        .populate({
            path: "comments",
            populate: { path: "author", populate: "username" }
        })
        .populate('author', 'username')

    if (posts.length === 0) {
        return res.status(200).json({ success: false, message: "No Posts to Show" })
    }
    return res.status(200).json({ success: true, posts })
})
module.exports = feedPostInfinite