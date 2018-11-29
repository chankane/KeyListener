let url = 'http://10.125.98.153:4649';
let socket = io.connect(url);

let playerId;
let garbages = [];
let playerNames = [];

socket.on("playerChanged", (names) => {
	for (let i in names) {
		let index = ++i;
		console.log("name" + index);
		document.getElementById("name" + index).innerText = names[index];
	}
});

socket.on("waitingFinished", (playerId) => {
	playerId = playerId;
});

socket.on("garbagesChanged", (garbages) => {
	console.log('changed');
	for (i in garbages) {
		document.getElementById("garbages" + i).innerText = garbages[i];
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
