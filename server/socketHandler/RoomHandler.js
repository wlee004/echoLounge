const roomHandler = (io, socket) => { 
    socket.on("room:joinRoom", (roomId) => {
        socket.join(roomId)
        console.log("\nroomhandler:" ,roomId)
        console.log("socket id:",socket.id)
        console.log("socket rooms:",socket.rooms)
    })

    // socket.on('room:leaveRoom', ({ roomId }) => {
    //     socket.leave(roomId)
    //     console.log(`User ${socket.id} left room ${roomId}`)
    //     socket.to(roomId).emit('roomMessage', `User ${socket.id} has left the room`)
    // })
}

module.exports = roomHandler