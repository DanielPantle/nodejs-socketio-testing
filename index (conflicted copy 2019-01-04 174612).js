'use strict';

var server = require('./server/io.js');
var GameServer = require('./server/GameServer.js');
var gameServer = new GameServer();

var connectionsCount = 0;

server.io.on('connection', function(socket) {
    connectionsCount++;
    console.log('socket connected: ', connectionsCount);
    var isServer = false;

    console.log(gameServer);

    if(gameServer.isActive()) {
        socket.emit('connected-to-server', gameServer.name);
    }

    socket.on('chat', function(data) {
        server.io.sockets.emit('chat', data);
    });

    socket.on('disconnect', function() {
        connectionsCount--;
        console.log('socket disconnected: ', connectionsCount);
        if(isServer) {
            gameServer.unbind();
        }
    });

    socket.on('register-server', function(data) {
        isServer = gameServer.register(socket, data.name);
        console.log('register server', isServer);

        if(isServer) {
            socket.emit('register-server-successful');
            server.io.sockets.emit('connected-to-server', gameServer.data);
        }
        else {
            socket.emit('register-server-failed');
        }
    });
});
