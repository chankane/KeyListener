class NextLogic {
  constructor(callback) {
    this._mino = MinoFactory.create();
    this._callbacki = callback;
  }
  
  next() {
    let mino = this._mino;
    this._mino = MinoFactory.create()
    this._callbacki(this._mino.getData());
    return mino;
  }
}