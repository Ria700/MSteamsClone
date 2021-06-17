const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true // Mute video for ourselves
const peers = {}
// Connect our video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => { // Promise
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => { // To share stream on all user screens
            setTimeout(() => {
                addVideoStream(video, userVideoStream)
            }, 1000)
        })
    })

    socket.on('user-connected', userId => { // event to connect to new user
        // user is joining
        setTimeout(() => {
          // user joined
          connectToNewUser(userId, stream)
        }, 1000)
      })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
}) 

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream =>{
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () =>{
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play() // Play the video
    })
    videoGrid.appendChild(video)
}