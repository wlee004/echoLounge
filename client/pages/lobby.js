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
                <nav className= "navbar" style={{"backgroundColor": "#393E46"}}>
                    <div className="container-fluid">
                        <h1 className={`${logoStyles.font} `} style={{"color": "#00ADB5"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" className="bi bi-collection-play-fill m-3" viewBox="0 0 16 16">
                                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437"/>
                            </svg>
                            ECHO LOUNGE
                        </h1>
                    </div>
                </nav>
            </header>

            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            {/* <div className={styles.container}>
                <div className={styles.lobbyform}>
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
            </div>  */}
        </div>

    )
}

export default Lobby