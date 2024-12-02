const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')

router.get("/register/username/:name", userController.registerUsername)
router.get("/username", userController.getUsername)

module.exports = router