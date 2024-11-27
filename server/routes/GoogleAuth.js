const express = require("express")
const router = express.Router()
const googleAuthController = require('../controllers/GoogleAuthController')

router.get("/authenticate", googleAuthController.oauth2_get)
router.get("/callback", googleAuthController.oauth2_callback)
router.get("/protected", googleAuthController.oauth2_protected)
router.get("/logout", googleAuthController.oauth2_logout)

module.exports = router