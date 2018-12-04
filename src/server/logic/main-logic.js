class MainLogic {
  static _initBackData() {
    let data = new Array(MainLogic._HEIGHT);
    for (let j = 0; j < MainLogic._HEIGHT; j++) {
      data[j] = new Array(MainLogic._WIDTH).fill(Color.EMPTY);
    }
    return data;
  }

  constructor(holdLogic, nextLogic, callback) {
    this._holdLogic = holdLogic;
    this._nextLogic = nextLogic;
    this._callbacku = callback;
    this._backData = MainLogic._initBackData();
    this._mino = nextLogic.next();
    this._droppingIntervalId = 0;
    //this._offsetX = this._offsetY = 0;
    this._callbacku(this._mino.getData());
  }

  start() {
    this._droppingIntervalId = setInterval(
      () => {
        this.OnSoftDrop();
      },
      MainLogic._DROPPING_INTERVAL_MSEC
    );
  }

  _stop(){
    clearInterval(this._droppingIntervalId);
  }

  _merge() {
    let merged = MainLogic._initBackData();
    let data = this._mino.getData();
    for (let j=0; j<data.length; j++) {
      for (let i=0; i<data[j].length; i++) {
        if (Color.EMPTY !== data[j][i]) {
          merged[this._mino._minoOffsetY + j][this._mino._minoOffsetX + i] = data[j][i];
        }
      }
    }
    return merged;
  }

  /* Many logic...*/
  OnHardDrop() {
    //?
    this._callbacku(this._merge());
  }

  OnSoftDrop() {
    this._mino.moveDown();
    if (Srs._isIllegalPosition()) {
      this._mino.moveUp();
      this._holdLogic.next();
    }
    this._callbacku(this._merge());
  }

  OnMoveLeft() {
    this._mino.moveLeft();
    if (Srs._isIllegalPosition()) {
      this._mino.moveRight();
    }
    this._callbacku(this._merge());
  }

  OnMoveRight() {
    this._mino.moveRight();
    if (Srs._isIllegalPosition()) {
      this._mino.moveLeft();
    }
    this._callbacku(this._merge());
  }

  OnRotateLeft() {
    if (Srs.rotateLeft(this._backData, this._mino)) {
      this._callbacku(this._merge());
    }
  }

  onRotateRight() {
    if (Srs.rotateRight(this._backData, this._mino)) {
      this._callbacku(this._merge());
    }
  }

  onHold() {
    this._mino = this._holdLogic.hold(this._mino);
    if (null === this._mino) {
      this._mino = this._nextLogic.next();
    }
    this._callbacku(this._merge());
  }
}

MainLogic._DROPPING_INTERVAL_MSEC = 1000;
MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;