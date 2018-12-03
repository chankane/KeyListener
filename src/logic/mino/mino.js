class Mino {
  constructor(pattern, color) {
    this.colors = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      this.colors[j] = new Array(pattern.length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          this.colors[j][i] = color;
        } else {
          this.colors[j][i] = Color.EMPTY;
        }
      }
    }
  }

  getColors() {
    return this.colors;
  }

  rotateR() {
    this._transpose();
    for (let j = 0; j < this.colors.length; j++) {
      for (let i = 0; i < this.colors.length / 2; i++) {
        let tmp = this.colors[j][i];
        this.colors[j][i] = this.colors[j][this.colors.length - i - 1];
        this.colors[j][this.colors.length - i - 1] = tmp;
      }
    }
  }

  rotateL() {
    this._transpose();
    for (let i = 0; i < this.colors.length / 2; i++) {
      let tmp = this.colors[i];
      this.colors[i] = this.colors[this.colors.length - i - 1];
      this.colors[this.colors.length - i - 1] = tmp;
    }
  }

  _transpose() {
    for (let j = 0; j < this.colors.length; j++) {
      for (let i = 0; i < j; i++) {
        let tmp = this.colors[j][i];
        this.colors[j][i] = this.colors[i][j];
        this.colors[i][j] = tmp;
      }
    }
  }
}