const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
  console.log('New client connected');
  socket.emit('message', 'Welcome!');
});

setInterval(function() {
  io.emit('message', 'Hello, I\'m sending this to all of you')
}, 3000)

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
