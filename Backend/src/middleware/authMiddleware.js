const jwt = require('jsonwebtoken');
const message = require('../models/message');

module.exports = function auth (req,res,next) {
   

    try {

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message : "token is invalid "})
    }
}