class Input {
  static initPressedTime() {
    let pressedTime = [];
    pressedTime[Input._MOVE_LEFT] = 0;
    pressedTime[Input._MOVE_RIGHT] = 0;
    pressedTime[Input._SOFT_DROP] = 0;
    pressedTime[Input._HARD_DROP] = 0;
    pressedTime[Input._ROTATE_LEFT] = 0;
    pressedTime[Input._ROTATE_RIGHT] = 0;
    pressedTime[Input._HOLD] = 0;
    return pressedTime;
  }

  constructor(document) {
    this._pressedTime = Input.initPressedTime();
    this._isPressed = [];
    document.onkeydown = (e) => {
      this._isPressed[e.key] = true;
    };
    document.onkeyup = (e) => this._isPressed[e.key] = false;
    setInterval(() => {
      this._updatePressedTime();
      this._callBack();
    }, 1000 / Input._FPS);
  }

  onMoveLeft() {}
  
  onMoveRight() {}

  onSoftDrop() {}

  onHardDrop() {}

  onRotateLeft() {}

  onRotateRight() {}

  onHold() {}

  _updatePressedTime() {
    for (let key in this._isPressed) {
      if(this._isPressed[key]) {
        this._pressedTime[key]++;
      } else {
        this._pressedTime[key] = 0;
      }
    }
  }

  _callBack() {
    if (1 === this._pressedTime[Input._MOVE_LEFT] || Input._WAIT_FRAME + 1 < this._pressedTime[Input._MOVE_LEFT]) {
      this.onMoveLeft();
    } else if (1 === this._pressedTime[Input._MOVE_RIGHT] || Input._WAIT_FRAME + 1 < this._pressedTime[Input._MOVE_RIGHT]) {
      this.onMoveRight();
    } else if (this._pressedTime[Input._SOFT_DROP]) {
      this.onSoftDrop();
    } else if (1 === this._pressedTime[Input._HARD_DROP]) {
      this.onHardDrop();
    } else if (1 === this._pressedTime[Input._ROTATE_LEFT]) {
      this.onRotateLeft();
    } else if (1 === this._pressedTime[Input._ROTATE_RIGHT]) {
      this.onRotateRight();
    } else if (1 === this._pressedTime[Input._HOLD]) {
      this.onHold(); console.log('hold!!');
    }
  }
}

Input._FPS = 30;
Input._WAIT_FRAME = 3;
Input._MOVE_LEFT = 'ArrowLeft';
Input._MOVE_RIGHT = 'ArrowRight';
Input._SOFT_DROP = 'ArrowDown';
Input._HARD_DROP = 'ArrowUp';
Input._ROTATE_LEFT = 'z';
Input._ROTATE_RIGHT = 'x';
Input._HOLD = ' ';
