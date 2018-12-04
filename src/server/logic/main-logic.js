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

  /* Many logic...*/
  OnHardDrop() {
    //?
    this._callbacku(this._mino.getData());
  }

  OnSoftDrop() {
    this._mino.moveDown();
    if (Srs._isIllegalPosition()) {
      this._mino.moveUp();
      this._holdLogic.next();
    }
    this._callbacku(this._mino.getData());
  }

  OnMoveLeft() {
    this._mino.moveLeft();
    if (Srs._isIllegalPosition()) {
      this._mino.moveRight();
    }
    this._callbacku(this._mino.getData());
  }

  OnMoveRight() {
    this._mino.moveRight();
    if (Srs._isIllegalPosition()) {
      this._mino.moveLeft();
    }
    this._callbacku(this._mino.getData());
  }

  OnRotateLeft() {
    if (Srs.rotateLeft(this._backData, this._mino)) {
      this._callbacku(this._mino.getData());
    }
  }

  onRotateRight() {
    if (Srs.rotateRight(this._backData, this._mino)) {
      this._callbacku(this._mino.getData());
    }
  }

  onHold() {
    this._mino = this._holdLogic.hold(this._mino);
    if (null === this._mino) {
      this._mino = this._nextLogic.next();
    }
    this._callbacku(this._mino.getData());
  }
}

MainLogic._DROPPING_INTERVAL_MSEC = 1000;
MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;