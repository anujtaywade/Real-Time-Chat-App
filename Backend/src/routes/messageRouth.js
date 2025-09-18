const router = require('express').Router()
const {sendMessage,getMessage} = require("../controller/message")

router.post("/message",sendMessage)
router.get("/message",getMessage)

module.exports = router