# MSteamsClone
<img src="https://github.com/Ria700/engageteamsclone/blob/main/Screenshot%20(229).png?raw=true" width="900px" align="center">
A fully functional Microsoft Teams clone built using WebRTC, Node.js and Express. Using this app, you can have high quality video calls with your friends all around the globe.
GitHub repo link: https://github.com/Ria700/MSteamsClone  
Check out the live demo: https://clonemsteams.herokuapp.com/  

### Developed using
- Node.js
- express
- socket.IO
- EJS
- UUID
- PeerJS (WebRTC)
- Deployment: Heroku

### Installation Guide
Make sure you have Node.js installed in your system. If not, download it from [here](https://nodejs.org/en/download/).

Clone [the following](https://github.com/Ria700/MSteamsClone) repo on your local system.

    git clone https://github.com/Ria700/MSteamsClone.git

Install PeerJS globally.

    npm i -g peerjs 

Now to install all required node modules

    npm i

Run Server

    npm start

Server Started on Port 3000.

Run PeerJS Server in separate terminal.

    peerjs --port 3001

PeerJS Server Started on Port 3001.  

Open browser and goto http://localhost:3000/

**Important :** Allow the camera and audio permissions asked by the browser.

Now copy the url and open in another tab.

Happy Video Call Experience!

### Features
1. Have a video conference with friends over different tabs, browsers, devices and networks.
2. More than two participants are able connect with each other using your product to have a good quality video conversation.
3. Experience high quality video calls
4. Switch audio on/off
5. Switch video on/off
6. Invite more participants
7. Leave meeting
8. UI similar to that of teams
9. Chat with particpants during the Call
10. Mirrored video
11. Adding own name to profile with which you join the meeting
12. Chat application accessible 
13. One time use disposable meeting ids
