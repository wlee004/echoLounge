import React from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080")

const Chat = () => {
    const sendMessage = () => { 
        socket.emit()
    }

    return (
        <div>
            <div className="messages mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3">
                <ul className="list-group">
                    <li className="message mb-2 p-2 bg-light rounded-3">Hello! How are you?</li>
                    <li className="message mb-2 p-2 bg-secondary text-white rounded-3">I'm good, thanks for asking!</li>
                </ul>
            </div>

            <div className="input-area d-flex w-100">
                <input type="text" id="chat-input" className="form-control me-2" placeholder="Type your message here..." aria-label="Message"/>
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
