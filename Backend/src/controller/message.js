const conversation = require("../models/conversation")
const message = require("../models/message")

exports.sendMessage = async (req,res) => {
    try {
        const {conversationId,text}= req.body
        senderId = req.user.id

        if(!conversationId || !text){
            res.status(400).json({message:"conversationId and text are required"})
        }

        


    } catch (error) {
        
    }
}


