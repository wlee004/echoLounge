const youtubeHandler = (io, socket) => { 
    socket.on("youtube:send_videoId", (data) => {
        console.log("title:", data.videoTitle)
        socket.to(data.roomId).emit("youtube:receive_videoId", {videoId: data.videoId, videoTitle: data.videoTitle})
    })

    // socket.on("youtube:send_videoTitle", (data) => {
    //     console.log("title:", data.videoTitle)
    //     socket.to(data.roomId).emit("youtube:receive_videoTitle", data.videoTitle)
    // })

    socket.on("youtube:clicked_pause", (roomId) => {
        socket.to(roomId).emit("youtube:pause_video")
    })

    socket.on("youtube:clicked_play", (roomId) => {
        socket.to(roomId).emit("youtube:play_video")
    })
}

module.exports = youtubeHandler