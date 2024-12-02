import React, { useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { useSocket } from '../pages/socketProvider'

const YoutubePlayer = (props) => {
    const { socket, socketConnected } = useSocket()
    const playerRef = useRef(null);
    const [queue, setQueue] = useState([])
    const [currentVideo, setCurrentVideo] = useState(null)
    //const queue = ["Test1","Test2","Test3"]

    useEffect(() => { 
        if (socketConnected) { 

            if (props.input.finalInput){
                setQueue((prevQueue) => [...prevQueue, [[props.input.finalInput][props.input.videoTitle]]]);
            }

            const pauseVideoPlayer = () => { 
                if (playerRef.current) {
                    playerRef.current.pauseVideo()
                }
            }

            const playVideoPlayer = () => { 
                if (playerRef.current) {
                    playerRef.current.playVideo()
                }
            }

            socket.on("youtube:pause_video", pauseVideoPlayer)
            socket.on("youtube:play_video", playVideoPlayer)
        }

    }, [socket, socketConnected])

    //On click, emit to other clients if its paused or continue playing
    const onPlayerPause = (event) => {
        socket.emit("youtube:clicked_pause", props.input.roomId)
    }

    const onPlayerReady = (event) => {
        socket.emit("youtube:clicked_play", props.input.roomId)
    }

    const onReady = (event) => {
        playerRef.current = event.target
    }

    const handleVideoEnd = () => {
        setCurrentSong(null)
    }

    // const onEnd = () => {
    //     // Move to the next video in the queue
    //     const nextQueue = queue.slice(1)
    //     setQueue(nextQueue)
    //     if (nextQueue.length > 0) {
    //       setCurrentVideo(nextQueue[0])
    //     } else {
    //       console.log("Queue is empty")
    //     }
    // }

    const addToQueue = (videoId,videoTitle) => {
        setQueue([...queue, [videoId,videoTitle]])
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }
    
    return (
        <div>
            <div>
                <YouTube videoId={currentVideo} 
                opts={opts} 
                onReady={onReady} 
                onPause={onPlayerPause} 
                onPlay={onPlayerReady}
                //onEnd={onEnd}
                />
            </div>          
        </div>
    )
}

export default YoutubePlayer
