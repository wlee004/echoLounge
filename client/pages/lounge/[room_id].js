import React, { useState, useEffect, useCallback } from "react"
// const Deque = require("collections/deque")
import Deque from "collections/deque"

// React Components 
import { useSocket } from '../../components/socketProvider'
import SearchBar from "../../components/SearchBar"
import YoutubePlayer from "../../components/YoutubePlayer"
import Chat from "../../components/Chat"
import VideoQueue from "../../components/VideoQueue"

const Room = () => {
    const [roomId, setRoomId] = useState("")
    const [queue, setQueue] = useState(new Deque())
    const { socket, socketConnected } = useSocket()

	const appendVideoToQueue = useCallback((newVideoId, newVideoTitle) => { 
		const newVideo = {videoId: newVideoId, videoTitle: newVideoTitle}
		const newQueue = queue.clone()
		console.log("APPEND VIDEO OLD QUEUE: ", newQueue)
		newQueue.push(newVideo)
		console.log("APPEND VIDEO: ", newQueue)
		if (socketConnected) { 
			socket.emit("youtube:send_queue", { queue: newQueue, roomId })
		}
		setQueue(newQueue)
	})

	useEffect(() => { 
        if (socketConnected) { 
			// Socket join Room
            const currRoomId = window.location.href.split("lounge/")[1]
			setRoomId(currRoomId) 
			socket.emit("room:joinRoom" , currRoomId)

			const updateVideoPlayer = (newQueue) => { 
				setQueue(newQueue)
			}
			socket.on("youtube:receive_queue", updateVideoPlayer)
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
					appendVideoToQueue={ appendVideoToQueue } 
				/>
			</div>
			<div>
                <YoutubePlayer 
					queue={ queue }
					roomId={ roomId }
				/>
                <VideoQueue queue={ queue }/>
                <Chat roomId={ roomId }/>
            </div>
		</div>
	)
}

export default Room
