const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)


var broadcasters = {}

app.use(cors())

app.get('/', (req, res) => {
	res.send({message: "hello world"})
})

app.get('/ping', (req, res) => {
	res.send({message: 'pong'})
})

app.get('/hindrance/:broadcaster_id/:hindrance_id', (req, res) => {
	let {hindrance_id, broadcaster_id} = req.params

	res.send({message: `successfully queue ${hindrance_id} for ${broadcaster_id}`})
})

io.on('connection', socket => {
	socket.emit('connected', {message: "connected"})
	socket.on('register_room', msg => {
		socket.join(msg.id)
		io.to(msg.id).emit('event', {message: "successfully registered"})
	})
})



server.listen(8081, () => {
	console.log("Working on port 8081")
})