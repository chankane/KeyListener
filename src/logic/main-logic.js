class MainLogic {
  _initColors() {
    this._colors = new Array(MainLogic._HEIGHT);
    for (let j = 0; j < MainLogic._HEIGHT; j++) {
      this._colors[j] = new Array(MainLogic._WIDTH).fill(Color.EMPTY);
    }
  }

  constructor() {
    this._colors = null;
    this.offsetX = this.offsetY = 0;
    this._initColors();
  }

  /* Many logic...*/
  OnHardDrop() {
    //?
  }

  OnSoftDrop() {
    this._minoY++;
    if (Srs._isIllegalPosition()) {
      this._minoY--;
      this._next();
    }
  }

  OnMoveLeft() {
    this._minoX--;
    if (Srs._isIllegalPosition()) {
      this._minoX++;
    }
  }

  OnMoveRight() {
    this._minoX++;
    if (Srs._isIllegalPosition()) {
      this._minoX--;
    }
  }

  OnRotateLeft() {
    this._mino.rotateL();
  }

  onRotateRight() {
    this._mino.rotateR();
  }

  onHold() {
    //?
  }
}

MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;