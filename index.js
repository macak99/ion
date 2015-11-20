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
	socket.on('chat message', function(msg) {
		if (msg !== "") {
			io.emit('chat message', msg);
			console.log("Message: " + msg);
		}
	});
});

http.listen(3000, function() {
	console.log('Server started on *:3000');
});