const PORT = '4649';
const io = generateSocketIo();

//let players = [];
let tetris = new Tetris((data) => io.sockets.emit('updated', data));

io.sockets.on('connection', (socket) => {
  tetris.addPlayer(socket.id, socket.handshake.query['name']);
  console.log('player: ' + socket.id);

  socket.on("disconnect", () => {
    tetris.deletePlayer(socket.id);
  });

  socket.on("start", () => {
    tetris.start();
  });

  socket.on("moveLeft", () => tetris.onMoveLeftKeyPressed(socket.id));
  socket.on("moveRight", () => tetris.onMoveRightKeyPressed(socket.id));
  socket.on("softDrop", () => tetris.onMoveDownKeyPressed(socket.id));
  socket.on("hardDrop", () => tetris.onHardDropKeyPressed(socket.id));
  socket.on("rotateLeft", () => tetris.onRotateLeftKeyPressed(socket.id));
  socket.on("rotateRight", () => tetris.onRotateRightKeyPressed(socket.id));
  socket.on("hold", () => /*attack(socket.id, 1)*/tetris.onHoldKeyPressed(socket.id));
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
