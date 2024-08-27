const asyncWrapper = require('../../middleware/async');
const bcrypt = require('bcrypt');

const signup = asyncWrapper(async (req, res) => {
    res.status(200).json({ success: true, msg: "Test passed" })
})
module.exports = signup;