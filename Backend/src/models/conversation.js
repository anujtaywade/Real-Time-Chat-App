const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participents:[{
        type:mongoose.Schema.Types.ObjectId, ref:'user'
    }],
    lastMessage:[{
        type:mongoose.Schema.Types.ObjectId , ref:'message'
    }],
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model("conservation",conversationSchema)