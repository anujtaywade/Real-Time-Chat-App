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

        const populatedMessage = await message
      .findById(newMessage._id)
      .populate("sender", "_id name");

        await conversation.findOneAndUpdate(
            {_id: conversationId},
            {lastMessage : newMessage._id,
            updatedAt : Date.now()}
        )

        res.status(201).json(populatedMessage)


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

exports.getMessage = async (req,res) => {
    try {
        const {conversationId} = req.params

        // ✅ Populate sender info
const findMessage = await message
  .find({conversationId: conversationId})
  .populate("sender", "_id name")  // Add this line
  .sort({createdAt: 1})
  .limit(50);
        
        res.status(200).json(findMessage)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}


