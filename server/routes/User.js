const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')

router.get("/", userController.user_get)

module.exports = router