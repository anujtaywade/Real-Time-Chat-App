const { compareSync } = require("bcrypt")
const conversation = require("../models/conversation")
const message = require("../models/message")
const user = require("../models/user")

exports.sendMessage = async (req,res) => {
    try {
        const {conversationId,text,senderId }= req.body
        

        if(!conversationId || !text || !senderId){
            return res.status(400).json({message:"conversationId and text are required"})
        }

        const newMessage = await message.create({
            conversationId,
            sender : senderId,
            text
        })

        await conversation.findOneAndUpdate(
            {_id: conversationId},
            {lastMessage : newMessage._id,
            updatedAt : Date.now()}
        )

        res.status(201).json({message:"message sent successfully",date:newMessage})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

exports.getMessage = async (req,res) => {
    try {
        const {conversationId} = req.params

        const findMessage = await message
        .find({conversation:conversationId})
        .sort({createdAt: -1})
        .limit(50) 
        
        res.status(201).json(findMessage)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}


