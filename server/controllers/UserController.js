const registerUsername = async (req, res) => { 
    req.session.username = req.params.name.replace(/\s+/g, '')
    console.log("Saving username: ", req.session.username)
    res.status(202).json({"message": `Registered usename: ${req.session.username}`})
}

const getUsername = async (req, res) => { 
    const username = req.session.username
    // if (username == null) { 
    //     res.status(404).json({"message": "Username not registered"})
    // }
    console.log("username: ", req.session.username)
    res.status(202).json({
        username: req.session.username
    })
}

module.exports = {registerUsername, getUsername}
