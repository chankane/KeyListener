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
	socket.emit('start');
}

function clear() {
	for (let i=0; i<4; i++) {
		document.getElementById("name" + (i + 1)).innerText = '';
		document.getElementById("damage" + (i + 1)).innerText = '';
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
		document.getElementById("damage" + (+i + 1)).innerText = players[i].damage;
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
