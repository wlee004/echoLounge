import React from 'react'

const VideoQueue = (props) => {

    return(
        <div>
            <h2>Queue</h2>
            <ul>
                {props.queue.map((videoId, index) => {
                    return <li key={index}> {videoId} </li>
                })}
            </ul>
        </div>
    )
}

export default VideoQueue