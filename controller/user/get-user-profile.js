const asyncWrapper = require('../../middleware/async');
const User = require('../../models/User')

const getUserProfile = asyncWrapper(async (req, res, next) => {

    const { username } = req.params;

    const { id } = req.user;
    console.log(username)
    const user = await User.findOne({ username: username })
        .populate({
            path: "posts",
            populate: {
                path: "comments",
                populate: { path: "author", select: "username" }
            }
        });

    if (!user) {
        return next(new Error('User not found', 404));
    }
    console.log(user._id, id)
    user.password = ""
    return res.status(200).json({ success: true, user: user, isOurProfile: user._id.toString() === id });

})

module.exports = getUserProfile;
