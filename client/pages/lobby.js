import React, { useState } from 'react' 
import { useRouter } from 'next/navigation'
import { generateGuestUsername } from "../components/Username"
import styles from '../styles/Lobby.module.css'
import logoStyles from "../styles/Logo.module.css"

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
        <div>
            <header>
                <nav className={`${logoStyles.navbar_bg_color} navbar fixed-top`}>
                    <div className="container-fluid">
                        <h1 className={`${logoStyles.font} `} style={{"color": "#00ADB5"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" className="bi bi-collection-play-fill m-3" viewBox="0 0 16 16">
                                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437"/>
                            </svg>
                            Echo Lounge
                        </h1>
                    </div>
                </nav>
            </header>

             <div className={styles.container}>
                <div className={styles.lobbyform} onSubmit={handleSubmit}>
                    <div className='col-8'>
                        <h1 className='d-flex justify-content-center fs-1'>Lets Join a Room!</h1>
                        <form>
                            <div className="form-group pt-3">
                                <label for="username">Username</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} id='username' placeholder="Enter your username"/>
                            </div>
                            <div className="form-group pt-3">
                                <label for="roomID">Room ID</label>
                                <input type="text" className="form-control" value={roomId} onChange={(e) => setRoomId(e.target.value)} id='roomID' placeholder="Enter your room ID" required/>
                            </div>
                            <div className='d-flex justify-content-center pt-4'>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div> 
                        </form>
                    </div>
                </div>  
            </div>  
        </div>

    )
}

export default Lobby