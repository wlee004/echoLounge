const axios = require('axios')
require("dotenv").config()

const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_DATA_URL
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
// TODO Remove this once cookies is added
const token = "ABC123"

const getVideos = async (req, res) => { 
    const { query } = req.body
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' })
    }
    
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    axios.get(`${YOUTUBE_API_URL}?q=${query}&type=video&key=${API_KEY}`, config)
        .then(
            response => response.json()
        )
        .then(
            data => {
                // Extract video information from the API response
                // const videos = data.items.map(item => ({
                //     title: item.snippet.title,
                //     videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                //     thumbnail: item.snippet.thumbnails.high.url,
                //     description: item.snippet.description,
                // }));
                res.status(202).json(data)
            }
        )
        .catch((error) => { 
            if (error.response.status === 401) {
                // Handle 401
                console.log("Unauthorized")
                res.status(401).json({ message: `Youtube API ${error.message}` })
            } 
            res.status(500).json({ message: `${error.message}` })
        })
}

module.exports = {getVideos}
