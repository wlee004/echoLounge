import React, { useEffect, useState } from 'react'
import { useSocket } from "./socketProvider"
import { generateGuestUsername } from "./Username"
import logoStyles from "../styles/Logo.module.css"
import InputStyles from "../styles/Input.module.css"
import ListStyles from "../styles/List.module.css"

const Chat = (props) => {
    const [message, setMessage] = useState("")
    const [messageLogs, setMessageLogs] = useState([])
    const [username, setUsername] = useState("")
    const { socket, socketConnected } = useSocket()

    useEffect(() => { 
        // Generate Username if one doesn't exists yet
        if (localStorage.getItem("username") == null) { 
            localStorage.setItem("username", generateGuestUsername())
        }
        setUsername(localStorage.getItem("username"))

        if (socketConnected) { 
            const appendMessageLogs = (newMessage) => { 
                setMessageLogs((previousMessages) => [...previousMessages, newMessage])
            }
            socket.on("chat:receive_message", appendMessageLogs)
        }
        // return () => {
        //     socket.off("chat:receive_message", appendMessageLogs)
        // }
    }, [socket, socketConnected])

    const sendMessage = async (event) => {
        event.preventDefault()
        if (message !== "") { 
            setMessageLogs((previousMessages) => [...previousMessages, message]) // TODO: Maybe remove this line depending on how we want to handle emit in backend
            socket.emit("chat:send_message", {message, "roomId": props.roomId} )
            setMessage("")
        }
    }

    return (
        <div style={{"display": "flex", "height": "60vh", "flexDirection": "column"}}>
            <div className={`d-flex flex-column messages mb-3 w-100 p-2 border border-1 rounded-3 ${logoStyles.navbar_bg_color}`}>
                <h2>Room Chat</h2>
                {
                    <h5>{username}</h5>
                }
                <ul className="list-group overflow-y-auto pt-3">
                    {messageLogs.map((msg, index) => {
                        return <li key={index} className={`list-group-item message mb-2 p-2 rounded-3 ${ListStyles.list_bg_color} d-inline-block`}>{msg}</li>
                    })}
                </ul>
                
                <form onSubmit={sendMessage} className="d-flex mb-3 mt-auto pt-3">
                    <input
                        type="text"
                        className={`form-control me-2 ${InputStyles.input_color}`}
                        placeholder="Send Message"
                        value={message}
                        onChange={ (event) => setMessage(event.target.value) }
                    />
                    <button type="submit" className="btn btn-primary">
                        Send
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Chat
