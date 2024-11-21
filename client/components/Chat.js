import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080/")

const Chat = () => {
    const [message, setMessage] = useState("")
    const [messageReceieved, setMessageReceived] = useState("")

    const sendMessage = () => { 
        socket.emit("send_message", {"message": message})
    }

    useEffect(() => { 
        socket.on("receive_message", (data) => { 
            setMessageReceived(data.message)
        })
    }, [socket])

    const handleInputChange = (event) => { 
        setMessage(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        sendMessage()
        setMessage("")
    }

    return (
        <div>
            <div className="messages mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3">
                <ul className="list-group">
                    <li className="message mb-2 p-2 bg-light rounded-3">{messageReceieved}</li>
                    {/* <li className="message mb-2 p-2 bg-secondary text-white rounded-3">{messageReceieved}</li> */}
                </ul>
            </div>

            <form onSubmit={handleSubmit} className="d-flex mb-3">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Send Message"
                        value={message}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="btn btn-primary">
                        Send
                    </button>
            </form>

 
        </div>
    )
}

export default Chat
