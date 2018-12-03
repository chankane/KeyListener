class HoldLogic {
  constructor(onUpdated) {
    this.mino = null;
  }

  hold(mino) {
    let tmp = this.mino;
    this.mino = mino;
    return tmp;
  }
}
