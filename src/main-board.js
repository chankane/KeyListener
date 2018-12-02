class MainBoard extends AbstractBoard {
  static _calcPixelWidth() {
    return MainBoard._BLOCK_SIZE * MainBoard._WIDTH;
  }
  
  static _calcPixelHeight() {
    return MainBoard._BLOCK_SIZE * MainBoard._HEIGHT;
  }

  constructor(canvas) {
    super(canvas);
  }

  repaint(colors) {
    this._clearScreen();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.context.fillStyle = colors[j][i];
        this.context.fillRect(MainBoard._BLOCK_SIZE * i, MainBoard._BLOCK_SIZE * (j - MainBoard._HIDE_HEIGHT + 0.25),
        MainBoard._BLOCK_SIZE - 2, MainBoard._BLOCK_SIZE - 2);
      }
    }

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
  }
}

MainBoard._BLOCK_SIZE = 20;
MainBoard.WIDTH = 10;
MainBoard.HEIGHT = 20.25;
