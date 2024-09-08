const User = require("../../models/User");
const Post = require('../../models/Post');
const asyncWrapper = require('../../middleware/async')

const getProfilePosts = asyncWrapper(async (req, res) => {

    const { userId } = req.params;

    const { posts } = await User.findById(userId).select("posts").populate("posts")

    return res.status(200).json({ sucess: true, posts: posts })
})

module.exports = getProfilePosts