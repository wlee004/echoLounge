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
    const { socket, socketConnected } = useSocket()
     
    useEffect(() => { 
        if (socketConnected) { 
            const updateVideoPlayer = (videoId) => { 
                setFinalInput(videoId)
            }

            const currRoomId = window.location.href.split("lounge/")[1]
            setRoomId(currRoomId) 
            
            //when Youtube handler sends videoId, we update current clients player
            socket.emit("room:joinRoom" , currRoomId)
            socket.on("youtube:receive_videoId", updateVideoPlayer)
        }
    }, [socket, socketConnected])

    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    };

    const sendVideoUpdate = (videoId) => {
        socket.emit("youtube:send_videoId", { videoId , roomId })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchInput.includes("https://www.youtube.com/")) {
        // User Submit Youtube link
                if (searchInput.split("v=").length > 1) {
                const videoId = searchInput.split("v=")[1].split("&")[0]
                setFinalInput(videoId)
                sendVideoUpdate(videoId)
                setSearchInput("")
            } else {
                // TODO Render an error message to client
                console.error(`Error with Youtube Request: ${error}`)
            }
        }
        else if(searchInput){
            // Make the API request to the backend
            fetch(`http://localhost:8080/api/youtube/getLink/${searchInput}`, {
                method: "GET",
                credentials: "include", // Ensure cookies are included in the request
            })
            .then((response) => response.json())
            .then((data) => {
                const videoId = data.videoId;
                setFinalInput(videoId)
                sendVideoUpdate(videoId)
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
                    onChange={handleInputChange}
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <div>
                <YoutubePlayer input={{ finalInput, roomId }} />
                <Chat roomId={ roomId }/>
            </div>
        </div>
        )
}

export default SearchBar
