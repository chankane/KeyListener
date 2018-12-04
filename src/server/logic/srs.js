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
