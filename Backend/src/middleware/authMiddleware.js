const jwt = require('jsonwebtoken')

module.exports = function auth (req,res,next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.send(401).json({Message:"on token"})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({Message : "token is invalid "})
    }
}