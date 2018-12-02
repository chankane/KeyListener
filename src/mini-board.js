class MiniBoard extends AbstractBoard {
  static _calcPixelWidth() {
    return MiniBoard._BLOCK_SIZE * MiniBoard._WIDTH;
  }
  
  static _calcPixelHeight() {
    return MiniBoard._BLOCK_SIZE * MiniBoard._HEIGHT;
  }

  constructor(canvas) {
    super(canvas);
	  canvas.width = MiniBoard._calcPixelWidth();
    canvas.height = MiniBoard._calcPixelHeight();
  }

  repaint(colors) {
    this._clearScreen();

    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        if ((this._context.fillStyle = colors[j][i]) !== Color.EMPTY) {
          this._context.fillRect(MiniBoard._BLOCK_SIZE * i, MiniBoard._BLOCK_SIZE * j, MiniBoard._BLOCK_SIZE - 2, MiniBoard._BLOCK_SIZE - 2);
        }
      }
    }
  }

  _clearScreen() {
    this._context.clearRect(0, 0, MiniBoard._calcPixelWidth(), MiniBoard._calcPixelHeight());
  }
}

MiniBoard._WIDTH = 5;
MiniBoard._HEIGHT = 4;
MiniBoard._BLOCK_SIZE = 20;
