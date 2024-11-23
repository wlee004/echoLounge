const chatHandler = (io, socket) => { 
    socket.on("chat:send_message", (msg) => { 
        socket.broadcast.emit("chat:receive_message", msg)
    })
}

module.exports = chatHandler