var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
	console.log("New user connected.");
	socket.on('disconnect', function() {
		console.log("User has disconnected.");
	});
});

io.on('connection', function(socket) {
	socket.on('chat poruka', function(msg) {
		if (msg !== "") {
			io.emit('chat poruka', msg);
			console.log("Poruka: " + msg);
		}
	});
});

http.listen(3000, function() {
	console.log('Server pokrenut na *:3000');
});