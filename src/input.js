class Input {
  constructor(document, listener) {
    this.listener = listener;
    document.onkeydown = (e) => {
      console.log(e.keyCode);
      switch (e.keyCode) {
      case KeyEvent.DOM_VK_LEFT:
        listener.onMoveLeft();
        break;
      case KeyEvent.DOM_VK_RIGHT:
        listener.onMoveRight();
        break;
      case KeyEvent.DOM_VK_DOWN:
        listener.onSoftDrop();
        break;
      case KeyEvent.DOM_VK_UP:
        listener.onHardDrop();
        break;
      case KeyEvent.DOM_VK_Z:
        listener.onRotateLeft();
        break;
      case KeyEvent.DOM_VK_X:
        listener.onRotateRight();
        break;
      case KeyEvent.DOM_VK_SPACE:
        listener.onHold();
        break;
      }
    };
    document.onkeyup = (e) => {};
  }
}