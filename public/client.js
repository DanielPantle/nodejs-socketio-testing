
var socket = io();

// receive message from server
socket.on('time', function(data) {
    $('#server-time').html('Server time: ' + data.message);
});

socket.on('connect', function() {
    $("#output").html("connected to node. Waiting for server...");
});
socket.on('disconnect', function() {
    $('#output').html("disconnected from node.");
});

socket.on('connected-to-server', function(data) {
    $('#output').html("connected to server " + data.name);
});
socket.on('server-disconnected', function(data) {
    $('#output').html("server disconnected.");
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
