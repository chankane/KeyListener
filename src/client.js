let url = 'http://10.125.98.153:4649';
let socket = io.connect(url);

let garbageRows = [];
let playerId;

socket.on("connected", (id) => {
	playerId = id;
	console.log(id);
});

socket.on("attack", (data) => {
	for (i in data) {
		garbageRows[i].innerText = data[i];
	}
});

onload = () => {
	garbageRows[0] = document.getElementById("garbage1");
	garbageRows[1] = document.getElementById("garbage2");
	socket.emit("connected");
	//let text = document.getElementById("text");
	//let test = new Test(text);
	//let input = new Input(document, test);
};

document.onkeydown = (e) => {
	socket.emit("attack", { playerId: playerId, rowsNum: 5 });
};
