const chatHandler = (io, socket) => { 
    socket.on("chat:send_message", (data) => {
        socket.to(data.roomId).emit("chat:receive_message", {"senderUsername": data.senderUsername, "message": data.message})
    })
}

module.exports = chatHandler