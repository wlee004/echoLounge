const youtubeHandler = (io, socket) => { 
    socket.on("youtube:send_videoId", (data) => {
        socket.to(data.roomId).emit("youtube:receive_videoId", data.videoId)
    })

    socket.on("youtube:clicked_pause", (roomId) => {
        socket.to(roomId).emit("youtube:pause_video")
    })

    socket.on("youtube:clicked_play", (roomId) => {
        socket.to(roomId).emit("youtube:play_video")
    })

}

module.exports = youtubeHandler