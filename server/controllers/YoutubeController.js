const axios = require('axios')
require("dotenv").config()

const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_DATA_URL
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

const getVideos = async (req, res) => { 
    const access_token = req.session.google_auth_token
    const query = req.params.input.replace(/\s+/g, '')
    
    if (!query) {
        return res.status(404).json({ message: 'Video Not Found, Query parameter is required' })
    }
    axios.get(`${YOUTUBE_API_URL}?q=${query}&type=video&key=${API_KEY}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    .then(response => {
        // TODO Process response.data and return one videoId
        res.status(202).json({videoId: response.data.items[0].id.videoId})
    })
    .catch(error => {
        if (error.response) {
            // The request was made, and the server responded with an error
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('Error Request:', error.request);
        } else {
            // Something happened while setting up the request
            console.error('Error Message:', error.message);
        }
    });
}

module.exports = {getVideos}
