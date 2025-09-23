const conversation = require('../models/conversation');
const User = require('../models/user');

// Create a new conversation or return existing one
exports.createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Cannot find senderId or receiverId" });
        }

        // Check if conversation already exists
        let existingConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!existingConversation) {
            const newConversation = await conversation.create({
                participants: [senderId, receiverId]
            });
            return res.status(201).json(newConversation); // 201 Created
        } else {
            return res.status(200).json(existingConversation);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get a specific conversation between two users
exports.getUserConversation = async (req, res) => {
    try {
        const userId = req.user.id;
        const otherUserId = req.params.otherUserId;

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

// Get all conversations for a specific user
exports.getUserConversations = async (req, res) => {
    try {
        const userId = req.params.userId;

        const conversations = await conversation.find({
            participants: { $in: [userId] }
        }).populate("participants", "name email");

        return res.status(200).json(conversations || []);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
