class Main extends KeyManager {
  static _generateSocketIo() {
    const server = require("http").createServer((req, res) => {
      Main._reqHandler(req, res);
    }).listen(Main.PORT);
    console.log('listening');
    return require('socket.io').listen(server);
  }

  static _reqHandler(req, res) {
    //console.log(req.url);
    if (req.url === '/') {
      req.url = '/index.html';
      res.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (req.url === '/index.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
    } else if (req.url.match('main')) {
      req.url = req.url.split('?')[0];
    }
    require("fs").readFile('.' + req.url, 'utf-8', (err, data) => {
      res.end(data);
    });
  }

  constructor() {
    //let players = [];
    this._io = Main._generateSocketIo();
    this._tetris = new Tetris((data) => io.sockets.emit('updated', data));
  }
}

Main.PORT = '4649';

let main = new Main();

main._io.on('connection', (socket) => {
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
