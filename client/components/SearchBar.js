import React, { useState, useEffect } from "react"
import { useSocket } from './socketProvider.js'

const SearchBar = ({roomId, updateSharedFinalInput}) => {
    const [searchInput, setSearchInput] = useState("")
    const [finalInput, setFinalInput] = useState(
        "https://www.youtube.com/watch?v=0H69m7TWB6E"
    )
    const [videoTitle, setVideoTitle] = useState("Temp")
    const [queue, setQueue] = useState([])
    const { socket, socketConnected } = useSocket()

    useEffect(() => { 
        if (socketConnected) { 
            // TODO Insert any socket connections needed for SearchBar
            
        }
    }, [socket, socketConnected])

    const handleSubmit = async (event) => {
        console.log("ROOM ID FROM SEARCH BAR: ", roomId, updateSharedFinalInput)
        const sendVideoUpdate = (videoId, videoTitle) => {
            socket.emit("youtube:send_videoId", { videoId , videoTitle , roomId })
        }

        event.preventDefault()
        if (searchInput.includes("https://www.youtube.com/")) {
            // User Submit Youtube link
            if (searchInput.split("v=").length > 1) {
                const videoId = searchInput.split("v=")[1].split("&")[0]
                setVideoTitle(`Youtube Link: ${searchInput}`)
                updateSharedFinalInput(videoId)
                setQueue((prevQueue) => ([...prevQueue, videoId]))
                sendVideoUpdate(videoId, videoTitle)
                setSearchInput("")
            } else {
                alert("Invalid Youtube Link")
            }
        }
        else if (searchInput) {
            // TODO check for credentials first and then call request only if credentials are satisfied
            // TODO Change fetch to axios
            // Make the API request to the backend
            fetch(`http://localhost:8080/api/youtube/getLink/${searchInput}`, {
                method: "GET",
                credentials: "include", // Ensure cookies are included in the request
            })
            .then((response) => response.json())
            .then((data) => {
                const videoId = data.videoId;
                const currVideoTitle = data.videoTitle
                //TODO Queue update here
                if(queue.length === 0){
                    setVideoTitle(currVideoTitle)
                    setFinalInput(videoId)
                }
                setQueue((prevQueue) => ([...prevQueue, videoId]))
                sendVideoUpdate(videoId, data.videoTitle)
                setSearchInput("")
            })
            .catch((error) => {
                console.error(`Error with Youtube Request: ${error}`)
            })
        } 
        else {
            console.log("No input detected. Please put an input in the search bar.")
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
