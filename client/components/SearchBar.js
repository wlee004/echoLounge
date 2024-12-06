import React, { useState, useEffect } from "react"
import { useSocket } from "./socketProvider.js"
import axios from "axios"

const SearchBar = ({roomId, appendVideoToQueue}) => {
    const [searchInput, setSearchInput] = useState("")
    const [videoTitle, setVideoTitle] = useState("")
    const { socket, socketConnected } = useSocket()

    useEffect(() => { 
        if (socketConnected) { 
            // TODO Insert any socket connections needed for SearchBar
            
        }
    }, [socket, socketConnected])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const sendRoomVideoUpdate = (videoId, videoTitle) => {
            socket.emit("youtube:send_videoId", { videoId, videoTitle, roomId })
        }

        if (searchInput.includes("https://www.youtube.com/")) {
            // User Submit Youtube link
            if (searchInput.split("v=").length > 1) {
                const videoId = searchInput.split("v=")[1].split("&")[0]
                const videoTitle = `Youtube Link: ${searchInput}`
                // Set States
                // updateSharedFinalInput(videoId)
                appendVideoToQueue(videoId, videoTitle)
                setVideoTitle(`Youtube Link: ${searchInput}`)
                // setQueue((prevQueue) => ([...prevQueue, videoId])) // TODO REMOVE THIS FROM SEARCHBAR
                sendRoomVideoUpdate(videoId, videoTitle) 
                setSearchInput("")
            } else {
                alert("Invalid Youtube Link")
            }
        }
        else if (searchInput) {
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
                    // updateSharedFinalInput(videoId) // Sends state to update [room_id] which updates Youtube Player
                    appendVideoToQueue(videoId, videoTitle)
                    setVideoTitle(videoTitle) // TODO Need to move this to [room_id]
                    // setQueue((prevQueue) => ([...prevQueue, videoId])) // TODO REMOVE THIS FROM SEARCHBAR
                    sendRoomVideoUpdate(videoId, videoTitle)
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
