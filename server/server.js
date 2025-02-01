const express = require("express")
const PORT = 8080 
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const session = require("express-session")

// Express Server
const app = express()
app.use(cors({
    origin: 'http://localhost:3000', // React app's URL
    credentials: true               // Allow credentials (cookies)
}))
app.use(session({ 
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Enable only for HTTPS if set true
        httpOnly: true, // Prevent client-side access to cookies
        sameSite: 'strict', // Mitigate CSRF attacks
        maxAge: 60 * 60 * 1000 // Token expiration (1 hour)
    }
}))
app.use(express.json())

// Route Imports
const youtubeRoute = require("./routes/Youtube")
const googleAuthRoute = require("./routes/GoogleAuth")
const userRoute = require("./routes/User")

// Routes
app.use("/api/youtube",youtubeRoute)
app.use("/api/auth/google", googleAuthRoute)
app.use("/api/user", userRoute)

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
const youtubeHandler = require("./socketHandler/YoutubeHandler")

// Handle Socket Connections
io.on('connection', (socket) => { 
    console.log(`User Connected ${socket.id}`)

    socket.on('disconnect', () => { 
        console.log(`User disconnected ${socket.id}`)
    })

    chatHandler(io, socket) 
    roomHandler(io, socket)
    youtubeHandler(io, socket)
})

server.listen(PORT, () => { 
    console.log(`Server started on port http://localhost:${PORT}`)
})