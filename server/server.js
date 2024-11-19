const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")
const { createServer } = require("http");

const app = express()
app.use(cookieParser())
app.use(cors())

//Socket.io 
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST'],        // Allowed HTTP methods
        credentials: true                // Allow credentials (cookies, etc.)
      }
 })

const PORT = 8080 

// Route Imports
const userRoute = require("./routes/User")
const youtubeRoute = require("./routes/Youtube")
const googleAuthRoute = require("./routes/GoogleAuth")

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true               // Allow credentials (cookies)
}))
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/youtube",youtubeRoute)
app.use("/api/auth/google", googleAuthRoute)

//client connect
io.on('connection', (socket) => {
    console.log('a user connected on ', socket.id)

    //client messages
    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}:`, data)
    
        // Broadcast the message to all connected clients
        io.emit('message', { sender: socket.id, message: data })
      })

    //cleint disconnect
    socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    })

  })
  
httpServer.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})