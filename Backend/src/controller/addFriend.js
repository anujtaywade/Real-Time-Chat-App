const conversation = require("../models/conversation");
const message = require("../models/message");
const user = require("../models/user")


exports.addFriend = async (req,res) => {
    try {
        const userId = req.user.id;

        const Friend = await user.findOne({
            uniqueID : req.body.friendUniqueId 
        })

        if (!Friend){
            return res.status(404).json({message : "user not found"})
        }

        const existingConversation = await conversation.findOne({
            participants : {$all : [userId,Friend._id]}
        })
        if (existingConversation){
            return res.status(400).json({message : "already friend"})
        }

        const newConversation = await conversation.create({
            participants : [userId,Friend._id]
        })
        res.status(201).json({message : 'friend add sucessfully',conversation:newConversation})


    } catch (error) {
        console.log(error)
        res.status(500).json({message : "server error"})
    }
}