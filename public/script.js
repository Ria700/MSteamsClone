const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true // Mute video for ourselves

// Connect our video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => { //Promise
    // myVideo = stream
    addVideoStream(myVideo, stream)
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

socket.on('user-connected', userId => {
    console.log('User connected: ' + userId) 
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadmetadata', () => {
        video.play() // Play the video
    })
    videoGrid.append(video)
}