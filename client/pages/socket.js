import React from "react"
import { io } from "socket.io-client"

// Create and export the socket instance
export const socket = io.connect("http://localhost:8080/")
export const SocketContext = React.createContext()