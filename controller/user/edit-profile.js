const asyncWrapper = require("../../middleware/async")
const User = require("../../models/User")

const editProfile = asyncWrapper(async (req, res, next) => {

    const { id } = req.user;
    const { user } = req.body;

    console.log("HEllo world", req.body)


    await User.findByIdAndUpdate(id, {
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        socialLinks: user?.socialLinks
    })
    res.status(200).json({ message: "Profile updated successfully", success: true });
})

module.exports = editProfile;