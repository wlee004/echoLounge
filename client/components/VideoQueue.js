import React from 'react'

const VideoQueue = (props) => {

    return(
        <div>
            <div className="mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3">
                <h2>VIDEO QUEUE</h2>
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
        </div>
    )
}

export default VideoQueue