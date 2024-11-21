import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080/")

const Chat = () => {
    const [message, setMessage] = useState("")
    const [messageLogs, setMessageLogs] = useState([])


    useEffect(() => { 
        socket.on("receive_message", (newMessage) => {
            console.log("data: ", newMessage)
            setMessageLogs((previousMessages) => [...previousMessages, newMessage])
        })
    }, [socket])

    const handleInputChange = (event) => { 
        setMessage(event.target.value)
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        setMessageLogs((previousMessages) => [...previousMessages, message])
        socket.emit("send_message", message)
        setMessage("")
    }

    return (
        <div>
            <div className="messages mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3">
                <ul className="list-group">
                    {messageLogs.map((msg, index) => {
                            return <li key={index} className="message mb-2 p-2 bg-light rounded-3">{msg}</li>
                    })}
                    {/* <li className="message mb-2 p-2 bg-light rounded-3">{messageReceieved}</li> */}
                    {/* <li className="message mb-2 p-2 bg-secondary text-white rounded-3">{messageReceieved}</li> */}
                </ul>
            </div>

            <form onSubmit={sendMessage} className="d-flex mb-3">
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
