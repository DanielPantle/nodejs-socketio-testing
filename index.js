'use strict';

const express = require('express');
const socket = require('socket.io');
//const path = require('path');

const PORT = process.env.PORT || 4000;

// app setup
var app = express();
var server = app.listen(PORT, function() {
    console.log('listening on port', PORT);
});

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
    });
});

function test() {
    io.emit('time', new Date().toTimeString());
}

/*
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
*/
