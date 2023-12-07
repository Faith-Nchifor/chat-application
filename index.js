const express = require('express');
const {
    Server
} = require("socket.io");
const http = require('http');

const app = express();
const server = http.createServer(app);


const io = new Server(server);

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    // console.log('a user connected');
    users= {}
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        console.log(socket.id);
        // console.log(socket.);
        io.emit('chat message', msg);
    });
    socket.on('authen',()=>{
        console.log(socket.id)
        socket.emit('authen',socket.id)
    })
    socket.on('private message', (data) => {
        // Emit the private message to the specific user
        io.to(data.to).emit('private message', {
            from: socket.id,
            message: data.message,
        });
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});