// pages/lobby.js
import React, { useEffect, useState, useContext } from 'react' 
import { useSocket } from '../pages/socketProvider'
import { useRouter } from 'next/navigation'

const Lobby = () => {
    const [roomId, setRoomId] = useState('')
    const { socket, socketConnected } = useSocket()
    const router = useRouter()

    useEffect(() => { 
        if (socketConnected) { 
            console.log("In lobby: ", socket.id)
        }
    }, [socket, socketConnected])

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value)
    }

    //After submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (roomId !== "") { 
            router.push(`http://localhost:3000/lounge/${roomId}`)
        }
    }

    return (
    <div>
        <h1>Lets Join A Room!</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>
            RoomId: 
            <input 
                type="roomId" 
                value={roomId}
                onChange={handleRoomIdChange}  
                placeholder="Enter your room ID"
            />
            </label>
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Lobby