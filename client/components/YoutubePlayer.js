import React, {useEffect, useState} from 'react'
import YouTube from 'react-youtube'

const YoutubePlayer = () => {

    const [videoId, setVideoId] = useState("2g811Eo7K8U")

    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    
  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady}/>
    </div>
  )
}

export default YoutubePlayer
