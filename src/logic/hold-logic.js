class HoldLogic {
  constructor() {
    this.mino = null;
  }
  
  hold(mino) {
    if (this.mino === null) {
      return false;
    }
    let tmp = this.mino;
    this.mino = mino;
    mino = tmp;
    return true;
  }
}
