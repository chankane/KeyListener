class MainBoard extends AbstractBoard {
  constructor(canvas) {
    super(canvas, MainBoard.WIDTH, MainBoard.HEIGHT, MainBoard._BLOCK_SIZE);
    this._setOffset(0, -3.75);
    this._setStrokeWidth(1);
  }
}

MainBoard.WIDTH = 10;
MainBoard.HEIGHT = 20.25;
MainBoard._BLOCK_SIZE = 15;

/*if (this.mino === null) {
      return;
    }
    for (let j=0; j<this.mino.length; j++) {
      for (let i=0; i<this.mino[j].length; i++) {
        if (this.mino[j][i] == Color.EMPTY) {
          continue;
        }
        this.context.fillStyle = this.mino[j][i];
        this.context.fillRect(MainBoard._BLOCK_SIZE * (this.minoX + i), MainBoard._BLOCK_SIZE * (this.minoY + j - MainBoard._HIDE_HEIGHT + 0.25),
        MainBoard._BLOCK_SIZE - 2, MainBoard._BLOCK_SIZE - 2);
      }
    }*/
