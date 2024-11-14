const express = require("express")
const router = express.Router()
const youtubeController = require('../controllers/YoutubeController')

router.post("/getLink",youtubeController.getVideos)

module.exports = router