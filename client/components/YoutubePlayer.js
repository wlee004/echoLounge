import React, { useEffect, useRef} from 'react'
import YouTube from 'react-youtube'
import { useSocket } from '../pages/socketProvider'

const YoutubePlayer = (props) => {
    const { socket, socketConnected, roomId } = useSocket()
    const playerRef = useRef(null);

    useEffect(() => { 
        if (socketConnected) { 
            const pauseVideoPlayer = () => { 
                if (playerRef.current) {
                    playerRef.current.pauseVideo()
                    console.log("Video paused by another client")
                }
            }

            const playVideoPlayer = () => { 
                if (playerRef.current) {
                    playerRef.current.playVideo()
                    console.log("Video paused by another client")
                }
            }

            socket.on("youtube:pause_video", pauseVideoPlayer)
            socket.on("youtube:play_video", playVideoPlayer)
        }

    }, [socket, socketConnected])

    //On click, emit to other clients if its paused or continue playing
    const onPlayerPause = (event) => {
        socket.emit("youtube:clicked_pause", roomId)
    }

    const onPlayerReady = (event) => {
        socket.emit("youtube:clicked_play", roomId)
    }

    const onReady = (event) => {
        playerRef.current = event.target; 
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
            <YouTube videoId={props.input} 
            opts={opts} 
            onReady={onReady} 
            onPause={onPlayerPause} 
            onPlay={onPlayerReady}/>
        </div>
    )
}

export default YoutubePlayer
