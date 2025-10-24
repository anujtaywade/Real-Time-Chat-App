const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next) {
    try {
        let token = req.cookies.token;
        
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({message: "No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message: "Token is invalid"})
    }
}