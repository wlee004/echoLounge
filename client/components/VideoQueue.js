import React from 'react'

const VideoQueue = (props) => {

    return(
        <div>
            <h2>Queue</h2>
            <ul>
                {props.queue.map((videoData, index) => {
                    return <li key={index}> videoId: {videoData.videoId} videoTitle: {videoData.videoTitle} </li>
                })}
            </ul>
        </div>
    )
}

export default VideoQueue