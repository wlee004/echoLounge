import React from 'react'
import logoStyles from "../styles/Logo.module.css"
import ListStyles from "../styles/List.module.css"

const VideoQueue = (props) => {

    return(
        <div>
            <div className={`d-flex flex-column mb-3 w-100 p-2 border border-1 rounded-3 ${logoStyles.navbar_bg_color}`} style={{"height": "800px"}}>
                <h2>Video Queue</h2>
                <ul className="list-group overflow-y-auto pt-3">
                    {props.queue.map((videoData, index) => {
                        /**
                         * Schema for videoData
                         *  {
                         *    videoId: string 
                         *    videoTitle: string
                         *  }
                         */
                        return <li className={`list-group-item p-1 ${ListStyles.list_bg_color}`} key={index}> {videoData.videoTitle} </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default VideoQueue