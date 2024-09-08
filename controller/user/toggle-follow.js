const User = require('../../models/User')
const asyncWrapper = require('../../middleware/async');
const { CustomAPIError } = require('../../errors/custom-error');

const toggleFollow = asyncWrapper(async (req, res, next) => {

    const { id } = req.user;

    const { userId } = req.body;

    if (!userId) {
        return next(new CustomAPIError("User don't Exists", 404))
    }

    const user = await User.findById(userId);

    if (user.followers.includes(id)) {

        await User.findByIdAndUpdate(
            userId,
            { $pull: { followers: id } }
        );

        await User.findByIdAndUpdate(id,
            { $pull: { following: userId } }
        )
        return res.status(200).json({ success: true, message: "You have removed the User from the following list" })
    }
    else {
        await User.findByIdAndUpdate(userId,
            { $addToSet: { followers: id } }
        )
        await User.findByIdAndUpdate(id,
            { $addToSet: { following: userId } }
        )
        return res.status(200).json({ success: true, message: "Successfully Followed the Person" })
    }

})

module.exports = toggleFollow