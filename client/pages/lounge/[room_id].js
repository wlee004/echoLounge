import React, { useState, useEffect, useCallback } from "react"
import Deque from "collections/deque"
import logoStyles from "../../styles/Logo.module.css"

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
		newQueue.push(newVideo)
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
		<div style={{"overflow-y": "hidden"}}>
			<header>
				<nav className= "navbar" style={{"backgroundColor": "blue"}}>
					<div className="container-fluid">
						<h1 className={`${logoStyles.font}`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" className="bi bi-collection-play-fill m-3" viewBox="0 0 16 16">
								<path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437"/>
							</svg>
							ECHO LOUNGE
						</h1>
					</div>
				</nav>
			</header>

			<div className="container-fluid">

				<div className="row p-3">
					<div className="col-md-3"/>
					<div className="col-md-6 ">
						<SearchBar 
							roomId={ roomId } 
							appendVideoToQueue={ appendVideoToQueue } 
						/>
					</div>
					<div className="col-md-3"/>
				</div>

				<div className="row" style={{height: "100vh"}}>
					<div className="col-lg-2">
						<VideoQueue queue={ queue }/>
					</div>
					<div className="col-lg-8">
						<YoutubePlayer 
							queue={ queue }
							roomId={ roomId }
						/>
					</div>
					<div className="col-lg-2">
						<Chat roomId={ roomId }/>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Room
