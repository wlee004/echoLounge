import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSocket } from '../pages/socketProvider'

const YoutubePlayer = (props) => {
    const { socket, socketConnected } = useSocket()
    const playerRef = useRef(null);
    const [isSeeking, setIsSeeking] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    //const queue = ["Test1","Test2","Test3"]

    useEffect(() => { 
        if (socketConnected) { 

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

            const syncVideoPlayer = (timeStamp) => {
                console.log("timeStamp: ", timeStamp)
                if (playerRef.current) {
                    playerRef.current.seekTo(timeStamp)
                    setIsSeeking(false)
                }
            }

            socket.on("youtube:pause_video", pauseVideoPlayer)
            socket.on("youtube:play_video", playVideoPlayer)
            socket.on("youtube:sync_video", syncVideoPlayer)
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

    const onPlayerStateChange = (event) => {
        if (event.data === 2) {
            // Call handleSeek when seeking or playing
            setIsSeeking(true)
          }

        if (event.data === 1 && isSeeking === true){
                const roomId = props.input.roomId
                const timeStamp = event.target.getCurrentTime();
                console.log(timeStamp)
                socket.emit("youtube:seekVideo", { roomId, timeStamp });
        }
    
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
                <YouTube videoId={props.input.finalInput} 
                opts={opts} 
                onReady={onReady} 
                onPause={onPlayerPause} 
                onPlay={onPlayerReady}
                onStateChange={onPlayerStateChange}
                
                //onSeek={onSeek}
                //onEnd={onEnd}
                />
            </div>          
        </div>
    )
}

export default YoutubePlayer
