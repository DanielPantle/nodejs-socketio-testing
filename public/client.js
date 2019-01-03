
var socket = io();

// receive message from server
socket.on('time', function(data) {
    $('#server-time').html('Server time: ' + data.message);
});

socket.on('server-registered', function(data) {
    $('#wait-for-server').html("server registered: " + data.name);
});
/*
// send message from client to server
document.getElementById('sendtime').addEventListener('click', function() {
    socket.emit('sendtime', {
         message: new Date().toTimeString()
    });
});

document.getElementById('settype-server').addEventListener('click', function() {
    socket.emit('type', {
         message: 'server'
    });
});
document.getElementById('settype-client').addEventListener('click', function() {
    socket.emit('type', {
         message: 'client'
    });
});
*/
