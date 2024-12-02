const roomHandler = (io, socket) => { 
    socket.on("room:joinRoom", (roomId) => {
        socket.join(roomId)
        console.log(`Socket ${socket.id} joined room ${roomId}`)
    })

    // socket.on('room:leaveRoom', ({ roomId }) => {
    //     socket.leave(roomId)
    //     console.log(`User ${socket.id} left room ${roomId}`)
    //     socket.to(roomId).emit('roomMessage', `User ${socket.id} has left the room`)
    // })
}

module.exports = roomHandler