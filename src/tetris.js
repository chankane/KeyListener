class Tetris {
  constructor(players, onUpdated) {
    this._players = [];
    this._logics = [];
    for (let key in players) {
      this._logics[key] = new mainLogic(new holdLogic(), new NextLogic());
    }
  }

  update() {
    for (key in this._players) {
      
    }
  }

  addPlayer(socketId, name) {
    let 
    this._players[socketId] = { name: name , damage: 0, holdBoardData};
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
}