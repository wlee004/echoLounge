const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8080 

app.use(cors())

// Sample GET request
app.get("/", (req, res) => { 
    res.json({message: "HELLO WORLD"})
})

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})