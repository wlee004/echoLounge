import React, { useState, useEffect } from "react"

// React Components 
import { useSocket } from '../../components/socketProvider'
import SearchBar from "../../components/SearchBar"
import YoutubePlayer from "../../components/YoutubePlayer"
import Chat from "../../components/Chat"
import VideoQueue from "../../components/VideoQueue"

const Room = () => {
    const [finalInput, setFinalInput] = useState(
        "https://www.youtube.com/watch?v=0H69m7TWB6E"
    )
    const [roomId, setRoomId] = useState("")
    const [videoTitle, setVideoTitle] = useState("Temp")
    const [queue, setQueue] = useState([])
    const { socket, socketConnected } = useSocket()

	const updateSharedFinalInput = (newValue) => {
		setFinalInput(newValue)
	}

	useEffect(() => { 
        if (socketConnected) { 
            const updateVideoPlayer = (data) => { 
                //TODO Queue update here, other clients queue always at 0
                if(queue.length === 0){
                    setVideoTitle(data.videoTitle)
                    setFinalInput(data.videoId)
                }
                setQueue((prevQueue) => ([...prevQueue, data.videoId]))
            }

            const currRoomId = window.location.href.split("lounge/")[1]
            console.log("currRoomId: ", currRoomId)
			setRoomId(currRoomId) 
            
            // When Youtube handler sends videoId, we update current clients player
            socket.emit("room:joinRoom" , currRoomId)
            socket.on("youtube:receive_videoId", updateVideoPlayer)
        }                                                                                                                                                                                                                                   
    }, [socket, socketConnected])

	return (
		<div>
			<header>
				<nav className= "navbar bg-body-tertiary" data-bs-theme="dark">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1">Echo Lounge</span>
					</div>
				</nav>
			</header>
			<div>
				<SearchBar 
					roomId={ roomId } 
					updateSharedFinalInput={ updateSharedFinalInput } 
				/>
			</div>
			<div>
                <YoutubePlayer input={{ finalInput, videoTitle, roomId }} />
                <VideoQueue queue={ queue }/>
                <Chat roomId={ roomId }/>
            </div>
		</div>
	)
}

export default Room
