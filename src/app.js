const PORT = '4649';
const io = initSocketIo();

let garbages = [0, 0];//[0, 0, 0, 0];

let playerIds = [];

io.sockets.on('connection', (socket) => {
  playerIds.push(socket.id);
  io.sockets.emit('playerChanged', playerIds);

  socket.on("disconnect", () => {
    // delete player
    playerIds = playerIds.filter((e) => e !== socket.id);
    io.sockets.emit('playerChanged', playerIds);
  });

  // everyone
  socket.on('attack', (rowsCount) => {
    attack(socketIdToPlayerId(socket.id), rowsCount);
    io.sockets.emit('garbageChanged', garbages);
    console.log(garbages);
  });
});

function initSocketIo() {
  const server = require("http").createServer((request, response) => {
    requestHandler(request, response);
  }).listen(PORT);
  console.log('listening');
  return require('socket.io').listen(server);
}

function attack(playerId, rowsCount) {
  for ( ; 0 < rowsCount; rowsCount--) {
    if (0 === garbages[playerId - 1]) {
      for (let i in garbages) {console.log(garbages[playerId - 1]);
        garbages[i]++;
      }
    }
    garbages[playerId - 1]--;
  }
}

function socketIdToPlayerId(socketId) {
  return playerId.indexOf(socketId);
}

function requestHandler(request, response) {
  console.log(request.url);
  if (request.url === '/') {
    request.url = '/index.html';
    response.writeHead(200, { 'Content-Type': 'text/html' });
  } else if (request.url === '/index.css') {
    response.writeHead(200, { 'Content-Type': 'text/css' });
  }
  require("fs").readFile('.' + request.url, 'utf-8', (err, data) => {
    response.end(data);
  });
}
