const express = require("express")
const router = express.Router()
const youtubeController = require('../controllers/YoutubeController')

router.get("/getLink/:input", youtubeController.getVideos) 

module.exports = router