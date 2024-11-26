const express = require("express")
const PORT = 8080 
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")
const http = require("http")

// Express Server
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true               // Allow credentials (cookies)
}))
app.use(express.json())

// Route Imports
const userRoute = require("./routes/User")
const youtubeRoute = require("./routes/Youtube")
const googleAuthRoute = require("./routes/GoogleAuth")

// Routes
app.use("/api/user", userRoute)
app.use("/api/youtube",youtubeRoute)
app.use("/api/auth/google", googleAuthRoute)

// Socket IO Server
const server = http.createServer(app)
const io = new Server(server, { 
    cors: { 
        origin: 'http://localhost:3000', // Replace with your React app's URL
        credentials: true                // Allow credentials (cookies)
    }
})

// Socket Handler Imports
const chatHandler = require("./socketHandler/ChatHandler")
const roomHandler = require("./socketHandler/RoomHandler")

// Handle Socket Connections
io.on('connection', (socket) => { 
    console.log(`User Connected ${socket.id}`)

    socket.on('disconnect', () => { 
        console.log(`User disconnected ${socket.id}`)
    })

    chatHandler(io, socket) 
    roomHandler(io, socket)
})

server.listen(PORT, () => { 
    console.log(`Server started on port http://localhost:${PORT}`)
})