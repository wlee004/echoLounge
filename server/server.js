const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())
app.use(cors())

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

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})