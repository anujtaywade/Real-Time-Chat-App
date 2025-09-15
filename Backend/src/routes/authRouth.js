const router = require('express').Router()
const {signup, login ,logout,profile} = require("../controller/authcontroller")
const auth = require('../middleware/authMiddleware')

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/profile",auth,profile)

module.exports = router