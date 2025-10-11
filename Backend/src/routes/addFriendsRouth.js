const router = require('express').Router()
const {addFriend} = require('../controller/addFriend')

router.post("/add-friend/:id",addFriend)

module.exports = router