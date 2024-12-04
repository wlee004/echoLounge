import React, { useState, useEffect, useCallback } from "react"

// React Components 
import { useSocket } from '../../components/socketProvider'
import SearchBar from "../../components/SearchBar"
import YoutubePlayer from "../../components/YoutubePlayer"
import Chat from "../../components/Chat"
import VideoQueue from "../../components/VideoQueue"

const Room = () => {
    const [finalInput, setFinalInput] = useState(
        "ekr2nIex040"
    )
    const [roomId, setRoomId] = useState("")
    const [videoTitle, setVideoTitle] = useState("Temp")
    const [queue, setQueue] = useState([])
    const { socket, socketConnected } = useSocket()

	const updateSharedFinalInput = useCallback((newValue) => {
		setFinalInput(newValue)
	})

	const updateSharedVideoTitle = useCallback((newValue) => { 
		setVideoTitle(newValue)
	})

	useEffect(() => { 
        if (socketConnected) { 
			// Socket join Room
            const currRoomId = window.location.href.split("lounge/")[1]
			setRoomId(currRoomId) 
			socket.emit("room:joinRoom" , currRoomId)

			// TODO: Update this when you update to videoQueue
			const updateVideoPlayer = (data) => { 
				setFinalInput(data.videoId)
				setVideoTitle(data.videoTitle)
				// setQueue((prevQueue) => ([...prevQueue, data.videoId]))
			}
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
                <YoutubePlayer 
					finalInput={ finalInput }
					videoTitle={ videoTitle }
					roomId={ roomId }
					updateSharedFinalInput = { updateSharedFinalInput }
					updateSharedVideoTitle = { updateSharedVideoTitle }
				/>
                <VideoQueue queue={ queue }/>
                <Chat roomId={ roomId }/>
            </div>
		</div>
	)
}

export default Room
