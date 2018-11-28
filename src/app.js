const http = require("http");
const fs = require("fs");

let id = 1;
class Main {
  constructor() {
    const server = http.createServer((request, response) => {
      this.requestHandler(request, response);
    });
    server.listen('4649');
    this._io = require('socket.io').listen(server);
    console.log('listening');
    this._garbageRow = [0, 0];//[0, 0, 0, 0];
    this.ioHandler();
  }

  ioHandler() {
    this._io.sockets.on('connection', (socket) => {
      socket.on('connected', (data) => {
        this._io.to(socket.id).emit('connected', id++);
      });
      //this._io.to(socket.id).emit('connection', id++);
      // server -> client (自分以外の全員宛に送る)
      socket.on('attack', (data) => {
        for (let i in data.rowsNum) {
          if (0 < this._garbageRow[data.playerId - 1]) {console.log(this._garbageRow[data.playerId - 1]);
            this._garbageRow[data.playerId - 1]--;
          } else {
            for (let j in this._garbageRow) {
              if (j !== data.playerId - 1) {
                this._garbageRow[j]++;
              }
            }
          }
        }
        this._io.sockets.emit('attack', this._garbageRow);
        console.log(this._garbageRow);
      });
    });
  }

  requestHandler(request, response) {
    console.log(request.url);
    if (request.url === '/') {
      request.url = '/index.html';
      response.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (request.url === '/index.css') {
      response.writeHead(200, { 'Content-Type': 'text/css' });
    }
    fs.readFile('.' + request.url, 'utf-8', (err, data) => {
      response.end(data);
    });
  }
}
const main = new Main();
