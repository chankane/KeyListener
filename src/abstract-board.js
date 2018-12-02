class AbstractBoard {
  static _calcPixelWidth() {
    throw new Error('Override _calcPixelWidth()');
  }
  
  static _calcPixelHeight() {
    throw new Error('Override _calcPixelHeight()');
  }

  constructor(canvas) {
    canvas.style.backgroundColor = 'gray';
    canvas.width = AbstractBoard._calcPixelWidth();
    canvas.height = AbstractBoard._calcPixelHeight();
    this._context = canvas.getContext('2d');
  }

  repaint(colors) {
    this._clearScreen();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.context.fillStyle = colors[j][i];
        this.context.fillRect(
          MainBoard._BLOCK_SIZE * i,
          MainBoard._BLOCK_SIZE * (j - MainBoard._HIDE_HEIGHT + 0.25),
          MainBoard._BLOCK_SIZE - 2,
          MainBoard._BLOCK_SIZE - 2
        );
      }
    }
  }

  _clearScreen() {
    this._context.clearRect(0, 0, AbstractBoard._calcPixelWidth(), AbstractBoard._calcPixelHeight());
  }
}
