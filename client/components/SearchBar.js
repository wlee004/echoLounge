import React, { useState, useEffect } from "react"
import { useSocket } from "./socketProvider.js"
import axios from "axios"

const SearchBar = ({roomId, appendVideoToQueue}) => {
    const [searchInput, setSearchInput] = useState("")
    const { socket, socketConnected } = useSocket()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (searchInput.includes("https://www.youtube.com/")) {
            // User Submit Youtube link
            if (searchInput.split("v=").length > 1) {
                const videoId = searchInput.split("v=")[1].split("&")[0]
                const videoTitle = `Youtube Link: ${searchInput}`
                
                // Set States
                appendVideoToQueue(videoId, videoTitle)
                setSearchInput("")
            } else {
                alert("Invalid Youtube Link")
            }
        } else if (searchInput) {
            // TODO check for credentials first and then call request only if credentials are satisfied
            // Query Google API to get video information
            axios.get(`http://localhost:8080/api/youtube/getLink/${searchInput}`, { 
                withCredentials: true
                })
                .then((response) => response.data)
                .then((data) => {
                    console.log("AXIOS: ", data)
                    const videoId = data.videoId
                    const videoTitle = data.videoTitle
                    
                    // Set States
                    appendVideoToQueue(videoId, videoTitle)
                    setSearchInput("")
                })
                .catch((error) => {
                    alert(`Error with Youtube Request: ${error}`)
                })
        } 
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search"
                    value={searchInput}
                    onChange={ (event) => setSearchInput(event.target.value) }
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar
