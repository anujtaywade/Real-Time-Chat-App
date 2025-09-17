const router = require('express').Router()
const {createConversation} = require("../controller/conversation")

router.post("/conversation",createConversation)

module.exports = router