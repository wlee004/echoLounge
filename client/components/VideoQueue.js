import React from 'react'

const VideoQueue = (props) => {

    return(
        <div>
            <h2>Queue</h2>
            <ul className="list-group">
                {props.queue.map((videoData, index) => {
                    /**
                     * Schema for videoData
                     *  {
                     *    videoId: string 
                     *    videoTitle: string
                     *  }
                     */
                    return <li className="list-group-item" key={index}> {videoData.videoTitle} </li>
                })}
            </ul>
        </div>
    )
}

export default VideoQueue