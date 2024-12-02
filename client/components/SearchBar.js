import React, { useState, useEffect } from "react"
import YoutubePlayer from "./YoutubePlayer.js"
import Chat from "./Chat.js"
import { useSocket } from '../pages/socketProvider'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")
    const [finalInput, setFinalInput] = useState(
        "https://www.youtube.com/watch?v=0H69m7TWB6E"
    )
    const [roomId, setRoomId] = useState("")
    const [videoTitle, setVideoTitle] = useState("")
    const { socket, socketConnected } = useSocket()
     
    useEffect(() => { 
        if (socketConnected) { 
            const updateVideoPlayer = (data) => { 
                setVideoTitle(data.videoTitle)
                setFinalInput(data.videoId)
            }

            const currRoomId = window.location.href.split("lounge/")[1]
            setRoomId(currRoomId) 
            
            // When Youtube handler sends videoId, we update current clients player
            socket.emit("room:joinRoom" , currRoomId)
            socket.on("youtube:receive_videoId", updateVideoPlayer)
        }
    }, [socket, socketConnected])

    const sendVideoUpdate = (videoId, videoTitle) => {
        socket.emit("youtube:send_videoId", { videoId , videoTitle , roomId })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (searchInput.includes("https://www.youtube.com/")) {
            // User Submit Youtube link
            if (searchInput.split("v=").length > 1) {
                const videoId = searchInput.split("v=")[1].split("&")[0]
                setVideoTitle("Pasted URL")
                setFinalInput(videoId)
                sendVideoUpdate(videoId,videoTitle)
                setSearchInput("")
            } else {
                // TODO Render an error message to client
                console.error(`Error with Youtube Request: ${error}`)
            }
        }
        else if(searchInput){
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
                setVideoTitle(data.videoTitle)
                setFinalInput(videoId)
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
            <div>
                <YoutubePlayer input={{ finalInput, videoTitle, roomId }} />
                {/* <h2>Queue</h2>
                <ul>
                    {queue.map((title, index) => {
                        return <li key={index}> {title} </li>
                    })}
                </ul> */}
                <Chat roomId={ roomId }/>
            </div>
        </div>
    )
}

export default SearchBar
