import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSocket } from './socketProvider'

const YoutubePlayer = ({ queue, roomId }) => {
    const { socket, socketConnected } = useSocket()
    const playerRef = useRef(null)
    const [isSeeking, setIsSeeking] = useState(false)
    const [queueIndex, setQueueIndex] = useState(-1)
    const [currentVideoId, setCurrentVideoId] = useState("")

    const queueNextSong = () => { 
        let newQueueIndex = queueIndex + 1 
        if (queueIndex === -1) { 
            newQueueIndex = queue.length - 1
        }
        if (queue.length > newQueueIndex) { 
            const newVideoId = queue[newQueueIndex].videoId
            console.log("new video: ", queue, newVideoId, newQueueIndex)
            setCurrentVideoId(newVideoId)
            setQueueIndex(newQueueIndex) 
        }
    }

    useEffect(() => { 
        if (queueIndex === -1 && queue.length !== 0) { 
            queueNextSong()
        }
        /**
         * TODO: Have Else statement that check if current video is at the end, 
         * TODO: if so go to next song
         */
    }, [queue])
    
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

    const onVideoEnd = () => {
        console.log("Video Ended")
        // If last video reset the index
        if (queue.length - 1 === queueIndex) { 
            setQueueIndex(-1)
        }
        queueNextSong()
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
                // videoId={ queue[0].videoId } 
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