class Tetris {
  constructor(callback) {
    this._callbacka = callback;
    this._players = [];
    this._logics = [];
    this._isRunning = false;
  }

  start() {
    for (let key in this._logics) {
      console.log('id: ' + key);
      this._logics[key].start();
    }
    this._isRunning = true;
  }

  addPlayer(socketId, name) {
    if (!this._isRunning) {
      this._players[socketId] = new Player(name, this.emit.bind(this));
      this._logics[socketId] = new MainLogic(
        new HoldLogic(this._players[socketId].setHoldData.bind(this._players[socketId])),
        new NextLogic(this._players[socketId].setNextData.bind(this._players[socketId])),
        this._players[socketId].setMainData.bind(this._players[socketId])
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
    this._callbacka(Tetris._convert(this._players));
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