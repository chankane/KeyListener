class Test extends KeyListener {
  constructor(text) {
    super();
    this._text = text;
  }

  onMoveLeft() {
    this._setText('<');
  }

  onMoveRight() {
    this._setText('>');
  }
  
  onSoftDrop() {
    this._setText('v');
  }

  onHardDrop() {
    this._setText('^');
  }

  onRotateLeft() {
    this._setText('<<');
  }

  onRotateRight() {
    this._setText('>>');
  }

  onHold() {
    this._setText('O');
  }

  _setText(str) {
    console.log(str);
    this._text.innerText = str;
  }
}