import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSocket } from './socketProvider'

const YoutubePlayer = ({ finalInput, videoTitle, roomId, updateSharedFinalInput, updateSharedVideoTitle }) => {
    const { socket, socketConnected } = useSocket()
    const playerRef = useRef(null)
    const previousFinalInput = useRef(finalInput)
    const [isSeeking, setIsSeeking] = useState(false)
    const [currentVideoId, setCurrentVideoId] = useState("")

    useEffect(() => { 
        console.log("SET NEW VIDEO")
        setCurrentVideoId(finalInput)
    }, [finalInput])
    
    useEffect(() => { 
        if (socketConnected) { 
            // Socket Sync YoutubePlayer
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

    const onPlayerPause = () => {
        socket.emit("youtube:clicked_pause", roomId)
    }

    const onPlayerReady = () => {
        socket.emit("youtube:clicked_play", roomId)
    }

    // TODO When video ends, play next video in queue
    const onVideoEnd = () => {
        console.log("End video start")
        socket.emit("youtube:video_ended", roomId)
    }

    const onReady = (event) => {
        playerRef.current = event.target
    }

    const onPlayerStateChange = (event) => {
        /**
         * 
         * Player will emit state when change happens
         * Reference: https://developers.google.com/youtube/iframe_api_reference
         * 
         * -1 (unstarted)
         * 0 (ended)
         * 1 (playing)
         * 2 (paused)
         * 3 (buffering)
         * 5 (video cued)
         */

        if (event.data === 2) {
            // Call handleSeek when seeking or playing
            setIsSeeking(true)
        }

        if (event.data === 1 && isSeeking === true){
                const timeStamp = event.target.getCurrentTime();
                socket.emit("youtube:seekVideo", { roomId, timeStamp })
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
            <YouTube 
                videoId={ currentVideoId } 
                opts={ opts } 
                onReady={ onReady } 
                onPause={ onPlayerPause } 
                onPlay={ onPlayerReady }
                onStateChange={ onPlayerStateChange }
                onEnd={ onVideoEnd }
            />
        </div>
    )
}

export default YoutubePlayer