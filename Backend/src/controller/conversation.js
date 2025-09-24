const { Mongoose, default: mongoose } = require('mongoose');
const conversation = require('../models/conversation');
const User = require('../models/user');


exports.createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Cannot find senderId or receiverId" });
        }

        const senderObjectId = new mongoose.Types.ObjectId(senderId)
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId)

        let existingConversation = await conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        });


        
        if (!existingConversation) {
            const newConversation = await conversation.create({
                participants: [senderObjectId, receiverObjectId]
            });
            return res.status(201).json(newConversation); 
        } else {
            return res.status(200).json(existingConversation);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.getUserConversation = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id); 
        const otherUserId = new mongoose.Types.ObjectId(req.params.otherUserId);

        const existingConversation = await conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        }).populate("participants", "name email");

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        return res.status(404).json({ message: "Conversation not found" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.getUserConversations = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        


        const conversations = await conversation.find({
            participants: { $in: [userId] }
        }).populate("participants", "name email")
        .populate("lastMessage")
        .sort({ updatedAt: -1 });
        
        

        return res.status(200).json(conversations || []);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
