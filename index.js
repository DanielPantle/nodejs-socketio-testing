
var server = require('./server/io.js');
var connections = require('./server/connections.js');

server.io.on('connection', function(socket) {
    console.log('client connected');
    connections.addConnection(socket);

    socket.on('chat', function(data) {
        server.io.sockets.emit('chat', data);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
        connections.removeConnection(socket);
    });

    socket.on('register-server', function(data) {
        console.log('register-server:', data);
        //connections.setType(socket, data);

        server.io.sockets.emit('server-registered', data);
    });

    // receive message from client
    socket.on('sendtime', function(data) {
        console.log('send time', data);
        // send message to all clients
        server.io.sockets.emit('time', data);
    });
});

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
