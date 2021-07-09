const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const user = prompt("Enter your name");

const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
})
let myVidStream;
const myVid = document.createElement('video')
myVid.muted = true;
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => { // Promise
    myVidStream = stream;
    addVideoStream(myVid, stream)

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
    // input value
    let text = $("input");
    // when press enter send message
    $('html').keydown(function (e) {
        if (e.which == 13 && text.val().length !== 0) {
            socket.emit('message', text.val())
            text.val('')
        }
    })
    socket.on("createMessage", (message, userName) => {
        $("ul").append(`<li class="message">
            <b>
                <i class="far fa-user-circle"></i>
                <span>${userName === user ? "me" : userName} </span> 
            </b>
            <br/>
                ${message}
        </li>`);
        scrollToBottom()
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id, user)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

const muteUnmute = () => {
    const enabled = myVidStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVidStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVidStream.getAudioTracks()[0].enabled = true;
    }
}

const playStop = () => {
    console.log('object')
    let enabled = myVidStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVidStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    } else {
        setStopVideo()
        myVidStream.getVideoTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
  <i class="stop fas fa-video-slash"></i>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}

document.getElementById("invite-button").addEventListener("click", getURL);

function getURL() {
    const c_url = window.location.href;
    copyToClipboard(c_url);
    alert("Url Copied to Clipboard,\nShare it with your Friends!\nUrl: " + c_url);
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// End Call
document.getElementById("end-button").addEventListener("click", endCall);

function endCall() {
    window.location.href = "https://clonemsteamschat.herokuapp.com/";
}