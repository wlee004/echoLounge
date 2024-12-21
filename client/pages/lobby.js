import React, { useState } from 'react' 
import { useRouter } from 'next/navigation'
import { generateGuestUsername } from "../components/Username"
import styles from '../styles/Lobby.module.css'

const Lobby = () => {
    const router = useRouter()
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')

    //After submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        // TODO: Make username unique, check against db for existing username?
        let currUsername = username
        if (username === '') { 
            currUsername = generateGuestUsername()
            setUsername(currUsername)
        }
        localStorage.setItem("username", currUsername)
        router.push(`http://localhost:3000/lounge/${roomId}`)
    }

    return (
        <div className={styles.container}>
            <h1>Lets Join A Room!</h1>
            <form className={styles.forms} onSubmit={handleSubmit}>
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
                </div>
                <div>
                    <label>
                    RoomId: 
                    </label>
                    <input 
                        type="text" 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)} 
                        placeholder="Enter your room ID"
                        required
                    />
                </div>
                <div>
                    <button className={styles.button} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Lobby