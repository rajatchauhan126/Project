const io = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.on('newActivity', (data) => {
    console.log(data);
});

socket.emit('startListeningToMailbox', 'abc');
socket.emit('publish', { mid: "abc", message: "Hello" });