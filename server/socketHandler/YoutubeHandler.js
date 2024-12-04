const youtubeHandler = (io, socket) => { 

    socket.on("youtube:send_videoId", (data) => {
        console.log("youtube:send_videoId")
        console.log("title:", data.videoTitle)
        console.log("video id: " , data.videoId)
        socket.to(data.roomId).emit("youtube:receive_videoId", {
            videoId: data.videoId, 
            videoTitle: data.videoTitle
        })
    })

    socket.on("youtube:clicked_pause", (roomId) => {
        socket.to(roomId).emit("youtube:pause_video")
    })

    socket.on("youtube:clicked_play", (roomId) => {
        socket.to(roomId).emit("youtube:play_video")
    })

    socket.on('youtube:seekVideo', (data)=>{
        socket.to(data.roomId).emit("youtube:sync_video", data.timeStamp)
    })

    //TODO From video end, ask to get next vid on queue and update finalInput on searchbar
    socket.on("youtube:video_ended", (roomId) => {
        socket.to(roomId).emit("youtube:next_video")
    })
}

module.exports = youtubeHandler