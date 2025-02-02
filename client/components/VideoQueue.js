import React from 'react'
import logoStyles from "../styles/Logo.module.css"
import ListStyles from "../styles/List.module.css"

const VideoQueue = (props) => {

    return(
        <div>
            <div className={`mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3 ${logoStyles.navbar_bg_color}`}>
                <h2>Video Queue</h2>
                <ul className="list-group">
                    {props.queue.map((videoData, index) => {
                        /**
                         * Schema for videoData
                         *  {
                         *    videoId: string 
                         *    videoTitle: string
                         *  }
                         */
                        return <li className={`list-group-item ${ListStyles.list_bg_color}`} key={index} styles={{"word-wrap": "break-word", "max-width": "50%",  "overflow-wrap": "break-word"}}> {videoData.videoTitle} </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default VideoQueue