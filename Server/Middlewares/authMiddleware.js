const jwt = require('jsonwebtoken')

const SECRET = 'super_secret_key_change_later'

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'invalid token format' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token or expired session' })
    }
}

module.exports = authMiddleware