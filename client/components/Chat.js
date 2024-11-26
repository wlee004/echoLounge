import React, { useEffect, useState, useContext } from 'react'
import { useSocket } from '../pages/socketProvider'

const Chat = () => {
    const [message, setMessage] = useState("")
    const [messageLogs, setMessageLogs] = useState([])
    const [roomId, setRoomId] = useState("")
    const { socket, socketConnected } = useSocket()
    
    useEffect(() => { 
        if (socketConnected) { 
            const appendMessageLogs = (newMessage) => { 
                console.log(newMessage)
                setMessageLogs((previousMessages) => [...previousMessages, newMessage])
            }

            const currRoomId = window.location.href.split("lounge/")[1]
            setRoomId(currRoomId)
            socket.emit("room:joinRoom" , currRoomId)

            socket.on("chat:receive_message", appendMessageLogs)
        }
        // return () => {
        //     socket.off("chat:receive_message", appendMessageLogs)
        // }
    }, [socket, socketConnected])

    const handleInputChange = (event) => { 
        setMessage(event.target.value)
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        if (message !== "") { 
            setMessageLogs((previousMessages) => [...previousMessages, message]) // TODO: Maybe remove this line depending on how we want to handle emit in backend
            socket.emit("chat:send_message", { message , roomId } )
            setMessage("")
        }
    }

    return (
        <div>
            <div className="messages mb-3 flex-grow-1 w-100 p-2 border border-1 rounded-3">
                <ul className="list-group">
                    {messageLogs.map((msg, index) => {
                            return <li key={index} className="list-group-item message mb-2 p-2 bg-light rounded-3">{msg}</li>
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
