const conversation = require('../models/conversation')

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