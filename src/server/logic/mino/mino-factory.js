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
