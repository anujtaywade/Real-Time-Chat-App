const router = require('express').Router()
const {signup, login ,logout,profile , verifyUser} = require("../controller/authcontroller")
const auth = require('../middleware/authMiddleware')

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/profile",auth,profile)
router.get("/me",auth, verifyUser)

module.exports = router