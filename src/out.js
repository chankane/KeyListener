let url = 'http://10.125.98.153:4649';
let socket = io.connect(url);

let playerId;

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
