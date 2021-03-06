'use strict';

// https://socket.io/docs/emit-cheatsheet/

var server = require('./server/io.js');
var GameServer = require('./server/GameServer.js');
var gameServer = new GameServer();

var connectionsCount = 0;

server.io.on('connection', function(socket) {
    connectionsCount++;
    console.log('socket connected', socket.id, connectionsCount);
    var isServer = false;

    if(gameServer.isActive()) {
        socket.emit('connected-to-server', gameServer.data);
        var data = {
            id: socket.id
        };
        gameServer.socket.emit('client-subscribed', data);
    }

    socket.on('chat', function(data) {
        server.io.sockets.emit('chat', data);
    });

    socket.on('disconnect', function() {
        connectionsCount--;
        console.log('socket disconnected: ', connectionsCount);
        if(isServer) {
            gameServer.unbind();
            server.io.sockets.emit('server-disconnected');
        } else if(gameServer.isActive()) {
            var data = {
                id: socket.id
            };
            console.log('client unsubscribed', data);
            gameServer.socket.emit('client-unsubscribed', data);
        }
    });

    socket.on('register-server', function(data) {
        isServer = gameServer.register(socket, data.name);
        console.log('register server', isServer);

        if(isServer) {
            socket.emit('register-server-successful');
            server.io.sockets.emit('connected-to-server', gameServer.data);
        } else {
            socket.emit('register-server-failed');
        }
    });
});
