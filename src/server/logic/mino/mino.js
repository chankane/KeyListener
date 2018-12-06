class Mino {
  static _initData(pattern, color) {
    let data = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      data[j] = new Array(pattern.length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          data[j][i] = color;
        } else {
          data[j][i] = Color.EMPTY;
        }
      }
    };
    return data;
  }

  constructor(pattern, color) {
    this._data = Mino._initData(pattern, color);
    this._rotationNum = 0;
  }

  getData() {
    return this._data;
  }

  getRotationNum() {
    return this._rotationNum;
  }

  resetRotation() {
    this._rotationNum = 0;
  }

  rotateRight() {
    this._transpose();
    for (let j = 0; j < this._data.length; j++) {
      for (let i = 0; i < this._data.length / 2; i++) {
        let tmp = this._data[j][i];
        this._data[j][i] = this._data[j][this._data.length - i - 1];
        this._data[j][this._data.length - i - 1] = tmp;
      }
    }
  }

  rotateLeft() {
    this._transpose();
    for (let i = 0; i < this._data.length / 2; i++) {
      let tmp = this._data[i];
      this._data[i] = this._data[this._data.length - i - 1];
      this._data[this._data.length - i - 1] = tmp;
    }
  }

  _transpose() {
    for (let j = 0; j < this._data.length; j++) {
      for (let i = 0; i < j; i++) {
        let tmp = this._data[j][i];
        this._data[j][i] = this._data[i][j];
        this._data[i][j] = tmp;
      }
    }
  }

  // moveLeft() {
  //   this._minoOffsetX--;
  // }

  // moveRight() {
  //   this._minoOffsetX++;
  // }

  // moveDown() {
  //   this._minoOffsetY++;
  // }

  // moveUp() {
  //   this._minoOffsetY--;
  // }
}