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
