const router = require('express').Router()
const {addFriend} = require('../controller/addFriend')
const auth = require("../middleware/authMiddleware")

router.post("/add-friend/:id", auth ,addFriend)

module.exports = router