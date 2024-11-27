import React, { useState } from 'react' 
import { useRouter } from 'next/navigation'
import axios from "axios"

const Lobby = () => {
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')

    const router = useRouter()

    //After submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // TODO: Make username unique, and make sure username is auto generated when blank 
        const currUsername = username
        localStorage.setItem("username", currUsername)

        if (roomId !== "") { 
            router.push(`http://localhost:3000/lounge/${roomId}`)
        } else { 
            alert("Please enter a room Id")
        }
        // TODO Handle case where roomId === ""
    }

    return (
    <div>
        <h1>Lets Join A Room!</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>
            Username: 
            </label>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter your username"
            />
            <label>
            RoomId: 
            </label>
            <input 
                type="text" 
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)} 
                placeholder="Enter your room ID"
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Lobby