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
const Color = {
  EMPTY: 'lightgray',
  I: 'cyan',
  O: 'yellow',
  S: 'lime',
  Z: 'red',
  J: 'blue',
  L: 'orange',
  T: 'magenta',
}
class I extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    super(pattern, Color.I);
  }
}
class J extends Mino {
  constructor() {
    let pattern = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.J);
  }
}
class L extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.L);
  }
}
class O extends Mino {
  constructor() {
    let pattern = [
      [1, 1],
      [1, 1],
    ];
    super(pattern, Color.O);
  }
}
class S extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    super(pattern, Color.S);
  }
}
class T extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.T);
  }
}
class Z extends Mino {
  constructor() {
    let pattern = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.Z);
  }
}
class HoldLogic {
  constructor() {
    this.mino = null;
  }
  
  hold(mino) {
    if (this.mino === null) {
      return false;
    }
    let tmp = this.mino;
    this.mino = mino;
    mino = tmp;
    return true;
  }
}
class MainLogic {
  _initColors() {
    this._colors = new Array(MainLogic._HEIGHT);
    for (let j = 0; j < MainLogic._HEIGHT; j++) {
      this._colors[j] = new Array(MainLogic._WIDTH).fill(Color.EMPTY);
    }
  }

  constructor() {
    this._colors = null;
    this.offsetX = this.offsetY = 0;
    this._initColors();
  }

  /* Many logic...*/
  OnHardDrop() {
    //?
  }

  OnSoftDrop() {
    this._minoY++;
    if (Srs._isIllegalPosition()) {
      this._minoY--;
      this._next();
    }
  }

  OnMoveLeft() {
    this._minoX--;
    if (Srs._isIllegalPosition()) {
      this._minoX++;
    }
  }

  OnMoveRight() {
    this._minoX++;
    if (Srs._isIllegalPosition()) {
      this._minoX--;
    }
  }

  OnRotateLeft() {
    this._mino.rotateL();
  }

  onRotateRight() {
    this._mino.rotateR();
  }

  onHold() {
    //?
  }
}

MainLogic._WIDTH = 10;
MainLogic._HEIGHT = 24;
class NextLogic {
  constructor() {
    this.mino = MinoFactory.create();
  }
  
  next() {
    let mino = this.mino;
    this.mino = MinoFactory.create();
    return mino;
  }
}
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
class AbstractBoard {
  constructor(canvas, blockNumX, blockNumY, blockSize) {
    console.log(canvas);
    canvas.style.backgroundColor = 'gray';
    canvas.width = this._canvasWidth = blockNumX * blockSize;
    canvas.height = this._canvasHeight = blockNumY * blockSize;
    this._context = canvas.getContext('2d');
    this._blockSize = blockSize;
    this._offsetX = this._offsetY = 0;
    this._strokeWidth = 1;
  }

  _setOffset(offsetX, offsetY) {
    this._offsetX = offsetX;
    this._offsetY = offsetY;
  }

  _setStrokeWidth(strokeWidth) {
    this._strokeWidth = strokeWidth;
  }

  repaint(colors) {
    this._clearScreen();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this._context.fillStyle = colors[j][i];
        this._context.fillRect(
          this._blockSize * (i + this._offsetX) + this._strokeWidth,
          this._blockSize * (j + this._offsetY) + this._strokeWidth,
          this._blockSize - this._strokeWidth * 2,
          this._blockSize - this._strokeWidth * 2
        );
      }
    }
  }

  _clearScreen() {
    this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  }
}
class MainBoard extends AbstractBoard {
  constructor(canvas) {
    super(canvas, MainBoard.WIDTH, MainBoard.HEIGHT, MainBoard._BLOCK_SIZE);
    this._setOffset(0, -3.75);
    this._setStrokeWidth(1);
  }
}

MainBoard.WIDTH = 10;
MainBoard.HEIGHT = 20.25;
MainBoard._BLOCK_SIZE = 15;

/*if (this.mino === null) {
      return;
    }
    for (let j=0; j<this.mino.length; j++) {
      for (let i=0; i<this.mino[j].length; i++) {
        if (this.mino[j][i] == Color.EMPTY) {
          continue;
        }
        this.context.fillStyle = this.mino[j][i];
        this.context.fillRect(MainBoard._BLOCK_SIZE * (this.minoX + i), MainBoard._BLOCK_SIZE * (this.minoY + j - MainBoard._HIDE_HEIGHT + 0.25),
        MainBoard._BLOCK_SIZE - 2, MainBoard._BLOCK_SIZE - 2);
      }
    }*/
class MiniBoard extends AbstractBoard {
  constructor(canvas) {
    super(canvas, MiniBoard._WIDTH, MiniBoard._HEIGHT, MiniBoard._BLOCK_SIZE);
    this._setStrokeWidth(1);
  }
}

MiniBoard._WIDTH = 5
MiniBoard._HEIGHT = 4;
MiniBoard._BLOCK_SIZE = 15;
//let url = 'http://10.125.98.153:4649';
let url = 'http://localhost:4649';
let socket = io.connect(url, { query: location.search.slice(1) });

let holdBoardList = [];
let mainBoardList = [];
let nextBoardList = [];

let input = new Input(document);
input.onMoveLeft = () => socket.emit('moveLeft');
input.onMoveRight = () => socket.emit('moveRight');
input.onSoftDrop = () => socket.emit('softDrop');
input.onHardDrop = () => socket.emit('hardDrop');
input.onRotateLeft = () => socket.emit('rotateLeft');
input.onRotateRight = () => socket.emit('rotateRight');
input.onHold = () => socket.emit('hold');

socket.on("updated", (players) => {
	console.log(players);
	clear();
	repaint(players);
});

function startForcibly() {
	socket.emit('startForcibly');
}


function clear() {
	for (let i=0; i<4; i++) {
		document.getElementById("name" + (i + 1)).innerText = '';
		document.getElementById("garbage" + (i + 1)).innerText = '';
	}
}

function repaint(players) {
	let arr = new Array(4);
	arr[0] = new Array(4);
	arr[1] = new Array(4);
	arr[2] = new Array(4);
	arr[3] = new Array(4);
	// Be careful. (i+1) is 01, 02, 03 or 04...
	for (let i in players) {
		document.getElementById("name" + (+i + 1)).innerText = players[i].name;
		document.getElementById("garbage" + (+i + 1)).innerText = players[i].garbage;
		holdBoardList[i].repaint(arr);
		mainBoardList[i].repaint(arr);
		nextBoardList[i].repaint(arr);
	}
}

onload = () => {
	for ( let i=0; i<4; i++) {
		holdBoardList.push(new MiniBoard(document.getElementById('holdCanvas' + (i+1))));
		mainBoardList.push(new MainBoard(document.getElementById('mainCanvas' + (i+1))));
		nextBoardList.push(new MiniBoard(document.getElementById('nextCanvas' + (i+1))));
	}
	
	//let test = new Test(text);
	//let input = new Input(document, test);
};
class Tetris {
  constructor(playerIdList, onUpdated) {
    this._logics = [];
    for (let playerId of playerIdList) {
      this._logics[playerId] = new mainLogic(new holdLogic(), new NextLogic());
    }
  }

  onMoveLeft(socketId) {
    this._logics[socketId].onMoveLeft();
  }

  onMoveRight(socketId) {
    this._logics[socketId].onMoveRight();
  }

  onSoftDrop(socketId) {
    this._logics[socketId].onSoftDrop();
  }

  onHardDrop(socketId) {
    this._logics[socketId].onHardDrop();
  }

  onRotateLeft(socketId) {
    this._logics[socketId].onRotateLeft();
  }

  onRotateRight(socketId) {
    this._logics[socketId].onRotateRight();
  }

  onHold(socketId) {
    this._logics[socketId].onHold();
  }

  onUpdated() {}
}
