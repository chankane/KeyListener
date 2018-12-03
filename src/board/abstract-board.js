class AbstractBoard {
  constructor(canvas, blockNumX, blockNumY, blockSize) {
    console.log(canvas);
    canvas.style.backgroundColor = 'gray';
    canvas.width = this._canvasWidth = blockNumX * blockSize;
    canvas.height = this._canvasHeight = blockNumY * blockSize;
    this._context = canvas.getContext('2d');
    this._blockSize = blockSize;
    this._offsetX = this._offsetY = 0;
    this._strokeWidth = 1;
  }

  _setOffset(offsetX, offsetY) {
    this._offsetX = offsetX;
    this._offsetY = offsetY;
  }

  _setStrokeWidth(strokeWidth) {
    this._strokeWidth = strokeWidth;
  }

  repaint(colors) {
    this._clearScreen();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this._context.fillStyle = colors[j][i];
        this._context.fillRect(
          this._blockSize * (i + this._offsetX) + this._strokeWidth,
          this._blockSize * (j + this._offsetY) + this._strokeWidth,
          this._blockSize - this._strokeWidth * 2,
          this._blockSize - this._strokeWidth * 2
        );
      }
    }
  }

  _clearScreen() {
    this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  }
}
