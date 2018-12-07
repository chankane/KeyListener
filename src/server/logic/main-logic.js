class MainLogic {
  static _initData() {
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
    this._data = MainLogic._initData();
    this._mino = nextLogic.next();
    this._droppingIntervalId = 0;
    this._minoOffsetX = this._minoOffsetY = 0;
    this._isGameOver = false;
    this._callbacku(this._merge());
  }

  start() {
    this._droppingIntervalId = setInterval(
      () => {
        this.onSoftDrop();
      },
      MainLogic._DROPPING_INTERVAL_MSEC
    );
   }

  _stop(){
    clearInterval(this._droppingIntervalId);
  }

  _merge() {
    let merged = MainLogic._initData();
    for (let j=0; j<merged.length; j++) {
      for (let i=0; i<merged[j].length; i++) {
        merged[j][i] = this._data[j][i];
      }
    }

    let data = this._mino.getData();
    for (let j=0; j<data.length; j++) {
      for (let i=0; i<data[j].length; i++) {
        if (Color.EMPTY !== data[j][i]) {
          merged[this._minoOffsetY + j][this._minoOffsetX + i] = data[j][i];
        }
      }
    }
    return merged;
  }

  /* Many logic...*/
  onHardDrop() {
    //?
    this._callbacku(this._merge());
  }

  onSoftDrop() {
    //this._mino.moveDown();
    this._minoOffsetY++;
    if (this._isIllegalPosition()) {
      this._minoOffsetY--;
      this._data = this._merge();
      if (!this._isGameOver) {
        this._mino = this._nextLogic.next();
        this._minoOffsetX = this._minoOffsetY = 0;
      }
      if (!this._isGameOver && this._isIllegalPosition()) {
        this._lose();
        this._isGameOver = true;
      }
    }
    this._callbacku(this._merge());
  }

  onMoveLeft() {
    this._minoOffsetX--;
    if (this._isIllegalPosition()) {
      this._minoOffsetX++;
    }
    this._callbacku(this._merge());
  }

  onMoveRight() {
    this._minoOffsetX++;
    if (this._isIllegalPosition()) {
      this._minoOffsetX--;
    }
    this._callbacku(this._merge());
  }

  onRotateLeft() {
    this._mino.rotateLeft();
    if (this._isIllegalPosition()) {
      this._mino.rotateRight();
    }
    this._callbacku(this._merge());
  }

  onRotateRight() {
    this._mino.rotateRight();
    if (this._isIllegalPosition()) {
      this._mino.rotateLeft();
    }
    this._callbacku(this._merge());
  }

  onHold() {
    this._mino = this._holdLogic.hold(this._mino);
    if (null === this._mino) {
      this._mino = this._nextLogic.next();
    }
    this._callbacku(this._merge());
  }

  _lose() {
    this._stop();
    this._toStone();
  }

  _toStone() {
    console.log('stone');
    let row = MainLogic._HEIGHT - 1;
    let id = setInterval(() => {
      console.log('row: ' + row);
      for (let i=0; i<MainLogic._WIDTH; i++) {
        this._data[row][i] = 'white';
      }
      this._callbacku(this._data);
      if (row-- < 1){
        clearInterval(id);
      }
    }, 100);
  }

  _isIllegalPosition() {
    let data = this._mino.getData();
    for (let j=0; j<data.length; j++) {
      for (let i=0; i<data[j].length; i++) {
        if (
          data[j][i] !== Color.EMPTY
          && (
            this._isOutOfRange(this._minoOffsetX + i, this._minoOffsetY + j)
            || this._data[this._minoOffsetY + j][this._minoOffsetX + i] !== Color.EMPTY
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  _isOutOfRange(indexX, indexY) {
    return indexX < 0 || indexX >= MainLogic._WIDTH || indexY < 0 || indexY >= MainLogic._HEIGHT;
  }
}

MainLogic._DROPPING_INTERVAL_MSEC = 1000;
MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;