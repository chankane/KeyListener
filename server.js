class Mino {
  static _initData(pattern, color) {
    let data = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      data[j] = new Array(pattern.length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          data[j][i] = color;
        } else {
          data[j][i] = Color.EMPTY;
        }
      }
    };
  }
  constructor(pattern, color) {
    this._data = Mino._initData(pattern, color);
    this._minoOffsetX = this._minoOffsetY = 0;
  }

  getData() {
    return this._data;
  }

  moveLeft() {
    this._minoOffsetX--;
  }

  moveRight() {
    this._minoOffsetX++;
  }

  moveDown() {
    this._minoOffsetY++;
  }

  moveUp() {
    this._minoOffsetY--;
  }

  rotateR() {
    this._transpose();
    for (let j = 0; j < this._data.length; j++) {
      for (let i = 0; i < this._data.length / 2; i++) {
        let tmp = this._data[j][i];
        this._data[j][i] = this._data[j][this._data.length - i - 1];
        this._data[j][this._data.length - i - 1] = tmp;
      }
    }
  }

  rotateL() {
    this._transpose();
    for (let i = 0; i < this._data.length / 2; i++) {
      let tmp = this._data[i];
      this._data[i] = this._data[this._data.length - i - 1];
      this._data[this._data.length - i - 1] = tmp;
    }
  }

  _transpose() {
    for (let j = 0; j < this._data.length; j++) {
      for (let i = 0; i < j; i++) {
        let tmp = this._data[j][i];
        this._data[j][i] = this._data[i][j];
        this._data[i][j] = tmp;
      }
    }
  }
}
const Color = {
  EMPTY: 'lightgray',
  I: 'cyan',
  O: 'yellow',
  S: 'lime',
  Z: 'red',
  J: 'blue',
  L: 'orange',
  T: 'magenta',
}
class I extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    super(pattern, Color.I);
  }
}
class J extends Mino {
  constructor() {
    let pattern = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.J);
  }
}
class L extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.L);
  }
}
class MinoFactory {
  static create() {
    let mino = null;
    switch(Math.floor(Math.random() * 7)) {
    case 0:
      mino = new I();
      break;
    case 1:
      mino = new O();
      break;
    case 2:
      mino = new S();
      break;
    case 3:
      mino = new Z();
      break;
    case 4:
      mino = new J();
      break;
    case 5:
      mino = new L();
      break;
    case 6:
      mino = new T();
      break;
    }
    return mino;
  }
}
class O extends Mino {
  constructor() {
    let pattern = [
      [1, 1],
      [1, 1],
    ];
    super(pattern, Color.O);
  }
}
class S extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    super(pattern, Color.S);
  }
}
class T extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.T);
  }
}
class Z extends Mino {
  constructor() {
    let pattern = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.Z);
  }
}
class HoldLogic {
  constructor(callback) {
    this._mino = null;
    this._callback = callback;
  }

  hold(mino) {
    let tmp = this._mino;
    this._mino = mino
    this._callback(this._mino.getData());
    return tmp;
  }
}
class MainLogic {
  static _initBackData() {
    let data = new Array(MainLogic._HEIGHT);
    for (let j = 0; j < MainLogic._HEIGHT; j++) {
      data[j] = new Array(MainLogic._WIDTH).fill(Color.EMPTY);
    }
    return data;
  }

  constructor(holdLogic, nextLogic, callback) {
    this._holdLogic = holdLogic;
    this._nextLogic = nextLogic;
    this._callback = callback;
    this._backData = MainLogic._initBackData();
    this._mino = nextLogic.next();
    this._droppingIntervalId = 0;
    //this._offsetX = this._offsetY = 0;
  }

  start() {
    this._droppingIntervalId = setInterval(
      () => {
        this.OnSoftDrop();
      },
      MainLogic._DROPPING_INTERVAL_MSEC
    );
  }

  _stop(){
    clearInterval(tihs._droppingIntervalId);
  }

  /* Many logic...*/
  OnHardDrop() {
    //?
    callback(this._mino.getData());
  }

  OnSoftDrop() {
    this._mino.moveDown();
    if (Srs._isIllegalPosition()) {
      this._mino.moveUp();
      this._holdLogic.next();
    }
    callback(this._mino.getData());
  }

  OnMoveLeft() {
    this._mino.moveLeft();
    if (Srs._isIllegalPosition()) {
      this._mino.moveRight();
    }
    callback(this._mino.getData());
  }

  OnMoveRight() {
    this._mino.moveRight();
    if (Srs._isIllegalPosition()) {
      this._mino.moveLeft();
    }
    callback(this._mino.getData());
  }

  OnRotateLeft() {
    if (Srs.rotateLeft(this._backData, this._mino)) {
      callback(this._mino.getData());
    }
  }

  onRotateRight() {
    if (Srs.rotateRight(this._backData, this._mino)) {
      callback(this._mino.getData());
    }
  }

  onHold() {
    this._mino = this._holdLogic.hold(this._mino);
    if (null === this._mino) {
      this._mino = this._nextLogic.next();
    }
    callback(this._mino.getData());
  }
}

MainLogic._DROPPING_INTERVAL_MSEC = 1000;
MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;
class NextLogic {
  constructor(callback) {
    this._mino = MinoFactory.create();
    this._callback = callback;
  }
  
  next() {
    let mino = this._mino;
    this._mino = MinoFactory.create()
    this._callback(this._mino.getData());
    return mino;
  }
}
class Srs {
  static isIllegalPosition(backData, mino) {
    for (let j=0; j<mino.length; j++) {
      for (let i=0; i<mino[j].length; i++) {
        if (backData[j][i] !== Color.EMPTY
            && (mino.x + i < 0 || mino.x + i >= MainBoard._WIDTH || mino.y + j >= MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT
            || backData[minoY + j][minoX + i] !== Color.EMPTY)) {
          return true;
        }
      }
    }
    return false;
  }

  static rotateLeft(backData, mino) {
    mino.rotateLeft();
    return true;
  }
  
  static rotateRight(data, mino) {
    mino.rotateRight();
  }
}
class Player {
  constructor(name, callback) {
    this._name = name;
    this._callback = callback;
    this._damage = 0;
    this._holdData = null;
    this._mainData = null;
    this._nextData = null;
  }

  get() {
    return {
      name: this._name,
      damage: this._damage,
      holdData: this._holdData,
      mainData: this._mainData,
      nextData: this._nextData
    };
  }

  // maybe, change add & sub
  setDamage(damage) {
    this._damage = damage;
    this._callback();
  }

  setHoldData(data) { 
    this._holdData = data;
    this._callback();
  }

  setMainData(data) {
    this._mainData = data;
    this._callback();
  }

  setNextData(data) {
    this._nextData = data;
    //this._callback();
  }
}
class Tetris {
  constructor(callback) {
    this._callback = callback;
    this._players = [];
    this._logics = [];
    this._isRunning = false;
  }

  start() {
    this._isRunning = true;
  }

  addPlayer(socketId, name) {
    if (!this._isRunning) {
      this._players[socketId] = new Player(name, this.emit);
      this._logics[socketId] = new MainLogic(
        new HoldLogic(this._players[socketId].setHoldData), new NextLogic(this._players[socketId].setNextData),
        this._players[socketId].setMainData
      );
    }
    this.emit();
  }

  deletePlayer(socketId) {
    // !Add message 'RUN AWAY'
    delete this._players[socketId];
    this.emit();
  }

  emit() {
    this._callback(Tetris._convert(this._players));
  }

  static _convert(players) {
    let tmp = [];
    for (let key in players) {
      tmp.push(players[key].get());
    }
    return tmp;
  }

  onMoveLeft(socketId) {
    this._logics[socketId].onMoveLeft();
  }

  onMoveRight(socketId) {
    this._logics[socketId].onMoveRight();
  }

  onSoftDrop(socketId) {
    this._logics[socketId].onSoftDrop();
  }

  onHardDrop(socketId) {
    this._logics[socketId].onHardDrop();
  }

  onRotateLeft(socketId) {
    this._logics[socketId].onRotateLeft();
  }

  onRotateRight(socketId) {
    this._logics[socketId].onRotateRight();
  }

  onHold(socketId) {
    this._logics[socketId].onHold();
  }

  onUpdated() {}

  _attack(socketId, rowsCount) {
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
}
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
