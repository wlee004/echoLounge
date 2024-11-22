const chatHandler = (io, socket) => { 

    socket.on("send_message", (msg) => { 
        socket.broadcast.emit("receive_message", msg)
    })
}

module.exports = chatHandler