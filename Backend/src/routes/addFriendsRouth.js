const router = require('express').Router()
const {addFriend} = require('../controller/addFriend')

router.post("/add-friend/:id",auth ,addFriend)

module.exports = router