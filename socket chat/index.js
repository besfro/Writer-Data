const fs = require('fs')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

let idsFile = fs.readFileSync('ids.txt')
let ids = +idsFile.toString()
function debounce (fn, delay) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
      timer = null
    }, delay)
  }
}
const writeIds = debounce(function () {
  fs.writeFileSync('ids.txt', ids)
}, 1000)

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('initial', () => {
    io.emit('initial', ids++)
    writeIds()
  })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3001, () => {
  console.log('listening on http://127.0.0.1:3001');
});

