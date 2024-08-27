const asyncWrapper = require("../../middleware/async");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = asyncWrapper(async (req, res) => {
    res.status(200).json({ success: true, msg: "Test passed" })
})
module.exports = login;