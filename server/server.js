const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8080 

// Route Imports
const userRoute = require("./routes/User")

app.use(cors())

app.use("/user", userRoute)

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})