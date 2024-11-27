import React, { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"

// Create context for socket to be shared
const SocketContext = React.createContext()

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [socketConnected, setSocketConnected] = useState(false)
    const [roomId, setRoomId] = useState("")
    
    useEffect(() => {
        const socketInstance = io.connect("http://localhost:8080")
        setSocket(socketInstance)
   
        socketInstance.on('connect', () => {
            setSocketConnected(true)
            
            //To make a single room connection for all components
            //we pass room id to children and connect to room once
            //TODO This only works for lounge/{roomid}
            const currRoomId = window.location.href.split("lounge/")[1]
            if(currRoomId){
                setRoomId(currRoomId) 
                
                if(socket){
                    socket.emit("room:joinRoom" , roomId)
                }
            }
        })
      
        socketInstance.on('disconnect', () => {
            setSocketConnected(false)  
        })
        
        return () => { 
            socketInstance.disconnect() // Clean up on unmount
            setSocketConnected(false)
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, socketConnected, roomId }}>
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = () => { 
    const context = useContext(SocketContext)
    if (!context) { 
        throw new Error("useSocket must be used within SocketProvider")
    }

    return context
} 

module.exports = { 
    SocketProvider, 
    useSocket 
}