const PORT = '4649';
const io = generateSocketIo();

let players = [];

function convert(players) {
  let tmp = [];
  for (let key in players) {
    tmp.push(players[key]);
  }
  return tmp;
}

function update() {
  io.sockets.emit('updated', convert(players));
}

io.sockets.on('connection', (socket) => {
  players[socket.id] = { name: socket.handshake.query['name'], damage: 0 };
  console.log('player: ' + players[socket.id].name);
  update();

  socket.on("disconnect", () => {
    delete players[socket.id];
    update();
  });

  socket.on("startForcibly", () => {
    // start
  });

  socket.on("moveLeft", () => {});
  socket.on("moveRight", () => {});
  socket.on("softDrop", () => {});
  socket.on("hardDrop", () => {});
  socket.on("rotateLeft", () => {});
  socket.on("rotateRight", () => {});
  socket.on("hold", () => {attack(socket.id, 1); update();});
});

function attack(socketId, rowsCount) {
  for ( ; 0 < rowsCount; rowsCount--) {
    if (0 === players[socketId].damage) {
      //players = players.map(e => { e.id, e.name, e.damage + 1 });
      for (let key in players) {
        players[key].damage++;
      }
    }
    players[socketId].damage--;
  }
}

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
