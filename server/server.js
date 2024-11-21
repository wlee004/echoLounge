const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")
const http = require("http")

const PORT = 8080 

// Express Server
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true               // Allow credentials (cookies)
}))
app.use(express.json())

// Socket IO Server
const server = http.createServer(app)
const io = new Server(server, { 
    cors: { 
        origin: 'http://localhost:3000', // Replace with your React app's URL
        credentials: true               // Allow credentials (cookies)
    }
})

// Route Imports
const userRoute = require("./routes/User")
const youtubeRoute = require("./routes/Youtube")
const googleAuthRoute = require("./routes/GoogleAuth")

// Socket IO 
io.on('connection', (socket) => { 
    console.log(`User Connected ${socket.id}`)

    socket.on("send_message", (data) => { 
        socket.broadcast.emit("receive_message", data)
    })
})

// Routes
app.use("/api/user", userRoute)
app.use("/api/youtube",youtubeRoute)
app.use("/api/auth/google", googleAuthRoute)

server.listen(PORT, () => { 
    console.log(`Server started on port http://localhost:${PORT}`)
})