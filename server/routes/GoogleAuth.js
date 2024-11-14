const express = require("express")
const session = require('express-session')
const { google } = require('googleapis')
const router = express.Router()
const googleAuthController = require('../controllers/GoogleAuthController')

router.get("/authenticate", googleAuthController.oauth2_get)
router.get("/callback", googleAuthController.oauth2_callback)
router.get("/protected", googleAuthController.oauth2_protected)

module.exports = router