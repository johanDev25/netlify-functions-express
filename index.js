  
let express = require('express');
let socket = require('socket.io');
const si = require('systeminformation');

// App setup
let app = express();
const port = process.env.port || 4000;
let server = app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
let io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    let netstat= {};
    // Handle chat event
    socket.on('chat', function(data){
        let {handle} = data
            si.networkStats().then(netUse => {
                netstat = {handle, netUse}
                io.sockets.emit('chat', netstat);
            })
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});