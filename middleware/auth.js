const jwt = require('jsonwebtoken');
const CustomErrorApi = require('../errors/custom-error')

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: 'Invalid Bearer' })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
        const { userId, username } = decoded
        req.user = { id: userId, username }
    } catch (err) {
        console.log(err)
        return res.status(401).json({ msg: "Not authorized to access this route" })
    }
    next();
}

module.exports = authentication;