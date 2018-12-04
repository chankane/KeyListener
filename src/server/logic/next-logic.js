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