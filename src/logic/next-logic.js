class NextLogic {
  constructor() {
    this.mino = MinoFactory.create();
  }
  
  next() {
    let mino = this.mino;
    this.mino = MinoFactory.create();
    return mino;
  }
}