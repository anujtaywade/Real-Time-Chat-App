const router = require('express').Router()
const {conversation} = require("../controller/conversation")

router.post("./conversation",conversation)

module.exports = router