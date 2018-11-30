let url = 'http://10.125.98.153:4649';
let socket = io.connect(url);

let playerId;
let garbages = [];
let playerNames = [];

socket.on("playersChanged", (names) => {
	// Clear
	for (let i=0; i<4; i++) {
		document.getElementById("name" + (i + 1)).innerText = '';
	}
	// Set
	for (let i in names) {
		// Be careful. (i+1) is 01, 02, 03 or 04...
		document.getElementById("name" + (+i + 1)).innerText = names[i];
	}
});

socket.on("waitingFinished", (playerId) => {
	playerId = playerId;
});

socket.on("garbagesChanged", (garbages) => {
	console.log('changed');
	// Clear
	for (let i=0; i<4; i++) {
		document.getElementById("garbage" + (i + 1)).innerText = '';
	}
	// Set
	for (i in garbages) {
		document.getElementById("garbage" + (+i + 1)).innerText = garbages[i];
	}
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
