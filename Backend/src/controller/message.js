const conversation = require("../models/conversation")
const message = require("../models/message")

exports.sendMessage = async (req,res) => {
    try {
        const {conversationId,text,senderId }= req.body
        

        if(!conversationId || !text || !senderId){
            res.status(400).json({message:"conversationId and text are required"})
        }

        const newMessage = await message.create({
            conversationId,
            sender : senderId,
            text
        })

        await message.findOneAndUpdate(conversationId,{
            lastMessage : newMessage._id,
            updatedAt : Date.now()
        })

        res.status(201).json({message:"message sent successfully",date:newMessage})


    } catch (error) {
        
    }
}


