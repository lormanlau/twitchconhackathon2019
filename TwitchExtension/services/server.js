const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send({message: "hello world"})
})

app.get('/ping', (req, res) => {
	res.send({message: 'pong'})
})

app.get('/hindrance/:broadcaster_id/:hindrance_id', (req, res) => {
	let {hindrance_id, broadcaster_id} = req.params
	io.to(broadcaster_id).emit('event', {id: hindrance_id})
	res.send({message: `successfully queue ${hindrance_id} for ${broadcaster_id}`})
})

app.post('/hindrance/:broadcaster_id/:hindrance_id', (req, res) => {
	let {hindrance_id, broadcaster_id} = req.params
	console.log(req.body)
	io.to(broadcaster_id).emit('event', {id: hindrance_id, text:req.body.text})
	res.send({message: `successfully queue ${hindrance_id} for ${broadcaster_id} with text ${req.body.text}`})
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