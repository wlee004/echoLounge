const youtubeHandler = (io, socket) => { 
    socket.on("youtube:send_videoId", (data) => {
        console.log(data.videoId)
        console.log(data.roomId)
        socket.to(data.roomId).emit("youtube:receive_videoId", data.videoId)
    })
}

module.exports = youtubeHandler