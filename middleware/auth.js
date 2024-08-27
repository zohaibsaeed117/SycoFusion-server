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
        const { id, username } = decoded
        req.user = { id, username }
    } catch (err) {
        return res.status(401).json({ msg: "Not authorized to access this route" })
    }
    next();
}

module.exports = authentication;