
const User = require("../../models/User")
const bcrypt = require("bcryptjs");
const asyncWrapper = require("../../middleware/async")
const signup = asyncWrapper(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(req.body)
    let user = new User({
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        // role: req.body.role,
        // skills: req.body.skills,
        password: hashedPassword,
        isBlocked: false,
        isAdmin: false,
        avatar: "",
        socialLinks: [],
        followers: [],
        following: [],
        blockedUsers: []
    })

    await user.save();
    return res.status(200).json({ success: true, message: "Your account has been created successfully." })
})


module.exports = signup; 