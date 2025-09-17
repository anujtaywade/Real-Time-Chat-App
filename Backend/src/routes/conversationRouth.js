const router = require('express').Router()
const {createConversation,getUserConservation} = require("../controller/conversation")
const auth = require('../middleware/authMiddleware')

router.post("/conversation",createConversation)
router.get("/find/:otherUserId",auth,getUserConservation)

module.exports = router