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
