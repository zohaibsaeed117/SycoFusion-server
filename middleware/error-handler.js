const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ success: false, msg: err.message })
    }
    console.log("Error:", err)
    return res.status(500).json({ success: false, msg: err.message })
}

module.exports = errorHandlerMiddleware
