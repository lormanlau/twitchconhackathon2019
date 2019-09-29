const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io').listen(http)


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
	console.log('someone connected')
	socket.on('register_room', (id, msg) => {
		console.log(id)
	})
})



app.listen(8081, () => {
	console.log("Working on port 8081")
})