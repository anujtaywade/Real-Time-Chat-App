const router = require('express').Router()
const {message} = require("../controller/message")

router.post("./message",message)

module.exports = router