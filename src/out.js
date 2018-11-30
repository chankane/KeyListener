let url = 'http://10.125.98.153:4649';
let socket = io.connect(url);

let playerId;
let garbages = [];
let playerNames = [];

socket.on("updated", (players) => {
	console.log(players);
	playersUpdated(players);
	garbagesUpdated(players);
});

function playersUpdated(players) {
	// Clear
	for (let i=0; i<4; i++) {
		document.getElementById("name" + (i + 1)).innerText = '';
	}
	// Set
	for (let i in players) {
		// Be careful. (i+1) is 01, 02, 03 or 04...
		document.getElementById("name" + (+i + 1)).innerText = players[i].name;
	}
}

function garbagesUpdated(players) {
	// Clear
	for (let i=0; i<4; i++) {
		document.getElementById("garbage" + (i + 1)).innerText = '';
	}
	// Set
	for (let i in players) {
		// Be careful. (i+1) is 01, 02, 03 or 04...
		document.getElementById("garbage" + (+i + 1)).innerText = players[i].garbage;
	}
}

socket.on("waitingFinished", (playerId) => {
	playerId = playerId;
});

onload = () => {
	//let text = document.getElementById("text");
	//let test = new Test(text);
	//let input = new Input(document, test);
};

document.onkeydown = (e) => {
	if(e.key===' ')
	socket.emit("attack", 5);
};
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

  constructor(document, listener) {
    this._listener = listener;
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
      this._listener.onMoveLeft();
    } else if (1 === this._pressedTime[Input._MOVE_RIGHT] || Input._WAIT_FRAME + 1 < this._pressedTime[Input._MOVE_RIGHT]) {
      this._listener.onMoveRight();
    } else if (this._pressedTime[Input._SOFT_DROP]) {
      this._listener.onSoftDrop();
    } else if (1 === this._pressedTime[Input._HARD_DROP]) {
      this._listener.onHardDrop();
    } else if (1 === this._pressedTime[Input._ROTATE_LEFT]) {
      this._listener.onRotateLeft();
    } else if (1 === this._pressedTime[Input._ROTATE_RIGHT]) {
      this._listener.onRotateRight();
    } else if (1 === this._pressedTime[Input._HOLD]) {
      this._listener.onHold();
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
class KeyListener {
  onMoveLeft() {
    throw new Error('Override onMoveLeft()');
  }

  onMoveRight() {
    throw new Error('Override onMoveRight()');
  }
  
  onSoftDrop() {
    throw new Error('Override onSoftDrop()');
  }

  onHardDrop() {
    throw new Error('Override onHardDrop()');
  }

  onRotateLeft() {
    throw new Error('Override onRotateLeft()');
  }

  onRotateRight() {
    throw new Error('Override onRotateRight()');
  }

  onHold() {
    throw new Error('Override onHold()');
  }
}
if (typeof KeyEvent === "undefined") { 
  var KeyEvent = { 
   DOM_VK_CANCEL: 3, 
   DOM_VK_HELP: 6, 
   DOM_VK_BACK_SPACE: 8, 
   DOM_VK_TAB: 9, 
   DOM_VK_CLEAR: 12, 
   DOM_VK_RETURN: 13, 
   DOM_VK_ENTER: 14, 
   DOM_VK_SHIFT: 16, 
   DOM_VK_CONTROL: 17, 
   DOM_VK_ALT: 18, 
   DOM_VK_PAUSE: 19, 
   DOM_VK_CAPS_LOCK: 20, 
   DOM_VK_ESCAPE: 27, 
   DOM_VK_SPACE: 32, 
   DOM_VK_PAGE_UP: 33, 
   DOM_VK_PAGE_DOWN: 34, 
   DOM_VK_END: 35, 
   DOM_VK_HOME: 36, 
   DOM_VK_LEFT: 37, 
   DOM_VK_UP: 38, 
   DOM_VK_RIGHT: 39, 
   DOM_VK_DOWN: 40, 
   DOM_VK_PRINTSCREEN: 44, 
   DOM_VK_INSERT: 45, 
   DOM_VK_DELETE: 46, 
   DOM_VK_0: 48, 
   DOM_VK_1: 49, 
   DOM_VK_2: 50, 
   DOM_VK_3: 51, 
   DOM_VK_4: 52, 
   DOM_VK_5: 53, 
   DOM_VK_6: 54, 
   DOM_VK_7: 55, 
   DOM_VK_8: 56, 
   DOM_VK_9: 57, 
   DOM_VK_SEMICOLON: 59, 
   DOM_VK_EQUALS: 61, 
   DOM_VK_A: 65, 
   DOM_VK_B: 66, 
   DOM_VK_C: 67, 
   DOM_VK_D: 68, 
   DOM_VK_E: 69, 
   DOM_VK_F: 70, 
   DOM_VK_G: 71, 
   DOM_VK_H: 72, 
   DOM_VK_I: 73, 
   DOM_VK_J: 74, 
   DOM_VK_K: 75, 
   DOM_VK_L: 76, 
   DOM_VK_M: 77, 
   DOM_VK_N: 78, 
   DOM_VK_O: 79, 
   DOM_VK_P: 80, 
   DOM_VK_Q: 81, 
   DOM_VK_R: 82, 
   DOM_VK_S: 83, 
   DOM_VK_T: 84, 
   DOM_VK_U: 85, 
   DOM_VK_V: 86, 
   DOM_VK_W: 87, 
   DOM_VK_X: 88, 
   DOM_VK_Y: 89, 
   DOM_VK_Z: 90, 
   DOM_VK_CONTEXT_MENU: 93, 
   DOM_VK_NUMPAD0: 96, 
   DOM_VK_NUMPAD1: 97, 
   DOM_VK_NUMPAD2: 98, 
   DOM_VK_NUMPAD3: 99, 
   DOM_VK_NUMPAD4: 100, 
   DOM_VK_NUMPAD5: 101, 
   DOM_VK_NUMPAD6: 102, 
   DOM_VK_NUMPAD7: 103, 
   DOM_VK_NUMPAD8: 104, 
   DOM_VK_NUMPAD9: 105, 
   DOM_VK_MULTIPLY: 106, 
   DOM_VK_ADD: 107, 
   DOM_VK_SEPARATOR: 108, 
   DOM_VK_SUBTRACT: 109, 
   DOM_VK_DECIMAL: 110, 
   DOM_VK_DIVIDE: 111, 
   DOM_VK_F1: 112, 
   DOM_VK_F2: 113, 
   DOM_VK_F3: 114, 
   DOM_VK_F4: 115, 
   DOM_VK_F5: 116, 
   DOM_VK_F6: 117, 
   DOM_VK_F7: 118, 
   DOM_VK_F8: 119, 
   DOM_VK_F9: 120, 
   DOM_VK_F10: 121, 
   DOM_VK_F11: 122, 
   DOM_VK_F12: 123, 
   DOM_VK_F13: 124, 
   DOM_VK_F14: 125, 
   DOM_VK_F15: 126, 
   DOM_VK_F16: 127, 
   DOM_VK_F17: 128, 
   DOM_VK_F18: 129, 
   DOM_VK_F19: 130, 
   DOM_VK_F20: 131, 
   DOM_VK_F21: 132, 
   DOM_VK_F22: 133, 
   DOM_VK_F23: 134, 
   DOM_VK_F24: 135, 
   DOM_VK_NUM_LOCK: 144, 
   DOM_VK_SCROLL_LOCK: 145, 
   DOM_VK_COMMA: 188, 
   DOM_VK_PERIOD: 190, 
   DOM_VK_SLASH: 191, 
   DOM_VK_BACK_QUOTE: 192, 
   DOM_VK_OPEN_BRACKET: 219, 
   DOM_VK_BACK_SLASH: 220, 
   DOM_VK_CLOSE_BRACKET: 221, 
   DOM_VK_QUOTE: 222, 
   DOM_VK_META: 224 
  }; 
} 
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
class Tetris {
  constructor(holdBoard, mainBoard, nextBoard) {
    this._holdBoard = holdBoard;
    this._mainBoard = mainBoard;
    this._nextBoard = nextBoard;
  }
}
