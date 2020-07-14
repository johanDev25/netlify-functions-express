  
let express = require('express');
let socket = require('socket.io');
const si = require('systeminformation');

// App setup
let app = express();
let server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
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