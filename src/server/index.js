// import Socket from 'react-socket-io';

var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3333);

io.on('connection', function(socket) {

    console.log('connected!');

    socket.on('JOIN_ROOM,', function(room) {
        socket.join(room);
    });

    socket.on('CHANGE_CLIENT', function(data) {
        console.log(data);
        socket.broadcast.in(data.room).emit('CHANGE_SERVER', data.code);
    });
    
});