class MiniBoard extends AbstractBoard {
  constructor(canvas) {
    super(canvas, MiniBoard._WIDTH, MiniBoard._HEIGHT, MiniBoard._BLOCK_SIZE);
    this._setStrokeWidth(1);
  }
}

MiniBoard._WIDTH = 5
MiniBoard._HEIGHT = 4;
MiniBoard._BLOCK_SIZE = 15;
