const PORT = '4649';
const io = generateSocketIo();

//let players = [];
let tetris = new Tetris((data) => io.sockets.emit('updated', data));

io.sockets.on('connection', (socket) => {
  tetris.addPlayer(socket.id, socket.handshake.query['name']);
  //console.log('player: ' + players[socket.id].name);

  socket.on("disconnect", () => {
    tetris.deletePlayer(socket.id);
  });

  socket.on("start", () => {
    tetris.start();
  });

  socket.on("moveLeft", () => tetris.onMoveLeft());
  socket.on("moveRight", () => tetris.onMoveRight());
  socket.on("softDrop", () => tetris.onSoftDrop());
  socket.on("hardDrop", () => tetris.onHardDrop());
  socket.on("rotateLeft", () => tetris.onRotateLeft());
  socket.on("rotateRight", () => tetris.onRotateRight());
  socket.on("hold", () => /*attack(socket.id, 1)*/tetris.onHold() );
});

function generateSocketIo() {
  const server = require("http").createServer((request, response) => {
    requestHandler(request, response);
  }).listen(PORT);
  console.log('listening');
  return require('socket.io').listen(server);
}

function requestHandler(request, response) {
  //console.log(request.url);
  if (request.url === '/') {
    request.url = '/index.html';
    response.writeHead(200, { 'Content-Type': 'text/html' });
  } else if (request.url === '/index.css') {
    response.writeHead(200, { 'Content-Type': 'text/css' });
  } else if (request.url.match('main')) {
    request.url = request.url.split('?')[0];
  }
  require("fs").readFile('.' + request.url, 'utf-8', (err, data) => {
    response.end(data);
  });
}
