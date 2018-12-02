//let url = 'http://10.125.98.153:4649';
let url = 'http://localhost:4649';
let socket = io.connect(url, { query: location.search.slice(1) });

/*let holdBoardList = [];
let mainBoardList = [];
let nextBoardList = [];*/

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
	console.log(location.search);
	clear();
	repaint(players);
});

function clear() {
	for (let i=0; i<4; i++) {
		document.getElementById("name" + (i + 1)).innerText = '';
		document.getElementById("garbage" + (i + 1)).innerText = '';
	}
}

function repaint(players) {
	// Be careful. (i+1) is 01, 02, 03 or 04...
	for (let i in players) {
		document.getElementById("name" + (+i + 1)).innerText = players[i].name;
		document.getElementById("garbage" + (+i + 1)).innerText = players[i].garbage;
	}
}

onload = () => {
	/*for ( let i=0; i<4; i++) {
		holdBoardList.push(new MiniBoard(document.getElementById('holdCanvas' + i)));
		mainBoardList.push(new MainBoard(document.getElementById('mainCanvas' + i)));
		nextBoardList.push(new MiniBoard(document.getElementById('nextCanvas' + i)));
	}*/
	
	//let test = new Test(text);
	//let input = new Input(document, test);
};
