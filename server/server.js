const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8080 

// Route Imports
const userRoute = require("./routes/User")
const youtubeRoute = require("./routes/Youtube")

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/youtube",youtubeRoute)

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})