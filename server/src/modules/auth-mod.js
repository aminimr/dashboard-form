const httpStatus = require('http-status');
const ApiError = require("../utils/ApiError");

module.exports = (options) => {
    if (options)
        console.log('options', options)

    return async (req, res, next) => {
        const getUserIdFromHeader = () => {
            const headers = req.headers
            for (const key in headers) {
                if (key.toLowerCase() === 'userid') return headers[key]
            }
            return null
        }
        const userId = req.query?.userId ?? getUserIdFromHeader() ?? null

        if (!userId) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'هویت کاربر تایید نشد.'))
        }

        req.userId = parseInt(userId)
        next()
    }
}