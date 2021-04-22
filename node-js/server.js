const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const router = require('./network/routes');
const socket = require('./socket');
const config = require('./config');
const db = require('./db');

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
socket.connect(server);
socket.socket.io.on('connection', function(socket) {
  console.log('New client connected');
  socket.emit('message', 'Welcome!');
});
router(app);

app.use('/app', express.static('public'));

server.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});

