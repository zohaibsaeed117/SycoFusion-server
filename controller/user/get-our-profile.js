const asyncWrapper = require('../../middleware/async');
const User = require('../../models/User')

const getOurProfile = asyncWrapper(async (req, res, next) => {

    const { id } = req.user;

    console.log(id)

    const user = await User.findById(id)
        .select("username firstName lastName email socialLinks");

    if (!user) {
        return next(new Error("User not found"));
    }

    return res.status(200).json({ success: true, user: user });

})

module.exports = getOurProfile;
