const PORT = '4649';
const io = generateSocketIo();

let players = [];
let names = [];

function findIndexBySocketId(socketId) {
  return players.findIndex(e => e.id === socketId);
}

function update() {
  io.sockets.emit('updated', players);
}

io.sockets.on('connection', (socket) => {
  players.push({ id: socket.id, name: names.shift(), garbage: 0 });
  update();

  socket.on("disconnect", () => {
    // Delete player
    players = players.filter(e => e.id !== socket.id);
    update();
  });

  // To everyone
  socket.on('attack', (rowsCount) => {
    attack(findIndexBySocketId(socket.id), rowsCount);
    update();
  });
});

function generateSocketIo() {
  const server = require("http").createServer((request, response) => {
    requestHandler(request, response);
  }).listen(PORT);
  console.log('listening');
  return require('socket.io').listen(server);
}

function attack(indexOfPlayers, rowsCount) {
  for ( ; 0 < rowsCount; rowsCount--) {
    if (0 === players[indexOfPlayers].garbage) {
      //players = players.map(e => { e.id, e.name, e.garbage + 1 });
      for (let i in players) {
        players[i].garbage++;
      }
    }
    players[indexOfPlayers].garbage--;
  }
}

function requestHandler(request, response) {
  //console.log(request.url);
  if (request.url === '/') {
    request.url = '/index.html';
    response.writeHead(200, { 'Content-Type': 'text/html' });
  } else if (request.url === '/index.css') {
    response.writeHead(200, { 'Content-Type': 'text/css' });
  } else if (request.url.match('main')) {
    let name = request.url.split('?')[1].split('=')[1];
    //players.push({name: name});
    names.push(name);
    console.log('p = ' + names);
    request.url = request.url.split('?')[0];
  }
  require("fs").readFile('.' + request.url, 'utf-8', (err, data) => {
    response.end(data);
  });
}
