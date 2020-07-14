var socket = io.connect('http://localhost:4000');
var osu = osu

  var handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');  


btn.addEventListener('click', function(){
    socket.emit('chat', {
        handle: handle.value
    });
});


handle.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML = '<p><strong>' + data.handle + ': </strong>Uso de Red</p>' + '<p><strong>Metodo de Conexion:</strong> '+  data.netUse[0].iface +'</p>' + '<p><strong>Bytes Recibidos:</strong> '+  data.netUse[0].rx_bytes +'</p>' + '<p><strong>Bytes Transferidos:</strong> '+  data.netUse[0].tx_bytes +'</p>' + '<p><strong>Bytes Recibidos / Segundo:</strong> '+  data.netUse[0].rx_sec +'</p>' + '<p><strong>Bytes Transferidos / Segundo:</strong> '+  data.netUse[0].tx_sec +'</p>' + '<p><strong>Latencia Actual:</strong> '+  data.netUse[0].ms +'</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});