const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
    conversationId :{
        type : mongoose.Schema.Types.ObjectId, ref:"conversation"
    },
    sender:{
        type : mongoose.Schema.Types.ObjectId , ref:"user"
    },
    text : {type:String},
    mediaUrl : {type :String},
    createdAt : {type:Date, default:Date.now}
})

module.exports = mongoose.model('message',messageSchema)