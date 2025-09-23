const router = require('express').Router()
const {createConversation,getUserConversation,getUserConversations} = require("../controller/conversation")
const auth = require('../middleware/authMiddleware')

router.post("/conversation",createConversation)
router.get("/find/:otherUserId",auth,getUserConversation)
router.get("/findAll/:userId",getUserConversations)
module.exports = router