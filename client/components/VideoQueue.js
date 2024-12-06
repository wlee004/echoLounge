import React from 'react'

const VideoQueue = (props) => {

    return(
        <div>
            <h2>Queue</h2>
            <ul>
                {props.queue.map((videoData, index) => {
                    /**
                     * Schema for videoData
                     *  {
                     *    videoId: string 
                     *    videoTitle: string
                     *  }
                     */
                    return <li key={index}> videoTitle: {videoData.videoTitle} </li>
                })}
            </ul>
        </div>
    )
}

export default VideoQueue