import React from 'react'
import YouTube from 'react-youtube'

const YoutubePlayer = (props) => {

    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
        console.log(props.input)
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
            <YouTube videoId={props.input} opts={opts} onReady={onPlayerReady}/>
        </div>
    )
}

export default YoutubePlayer
