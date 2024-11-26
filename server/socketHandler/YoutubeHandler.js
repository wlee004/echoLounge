const youtubeHandler = (io, socket) => { 
    socket.on("youtube:send_videoId", (data) => {
        socket.to(data.roomId).emit("youtube:receive_videoId", data.videoId)
    })
}

module.exports = youtubeHandler