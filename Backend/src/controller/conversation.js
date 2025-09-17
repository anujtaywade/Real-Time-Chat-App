const conversation = require('../models/conversation')
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');


exports.createConversation = async (req,res) => {
    try {
        const senderId = req.body.id;
        const recieverId = req.body.recieverId

        if(!recieverId){
            res.status(400).json({Message:"cannot find recieverId"})
        } 

        let conversationHappen = await conversation.findOne({
            participants:{$all :[senderId,recieverId]}
        }) 
        if(!conversationHappen){
            await conversation.create({
                participants:[senderId,recieverId]
            })
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({Message :"server error"})
    }
}

exports.conversation = async (req,res) => {
    try {
       const userId = req.user.id
       const otherUserId = req.params.otherUserId

       const existingConversation = await findOne({
        participants:{$all:[userId,otherUserId]}
       })

       if(existingConversation){
        res.status(400).json({
            Message :"conservation exist",
            conversation :existingConversation
        })
       }

       return res.status(200).json({Message: "no conversation found "})
    } catch (error) {
        console.log(error)
        res.status(201).json({Message  : " server error"})
    }
}