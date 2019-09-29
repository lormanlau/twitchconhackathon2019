const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const fs = require('fs'); // for reading json file 

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
	res.send({message: "hello world"})
})

app.get('/ping', (req, res) => {
	res.send({message: 'pong'})
})

// tell the user if they can use it or not
app.get('/hindrance/:broadcaster_id/:hindrance_id', (req, res) => {
	let {hindrance_id, broadcaster_id} = req.params
	

	// rawData = fs.readFileSync("./broadcasters.json");
	// data = JSON.parse(rawData); 
	data = require('./broadcasters.json')

	if(!data.hasOwnProperty(broadcaster_id) || data[broadcaster_id] == false) {
		return res.send({message: "extension is currently not active on server"})
	} else {
		io.to(broadcaster_id).emit('event', {id: hindrance_id})
		return res.send({message: `successfully queue ${hindrance_id} for ${broadcaster_id}`})
	}
})

app.post('/hindrance/:broadcaster_id/:hindrance_id', (req, res) => {
	let {hindrance_id, broadcaster_id} = req.params

	// rawData = fs.readFileSync("./broadcasters.json");
	// data = JSON.parse(rawData); 
	data = require('./broadcasters.json')

	if(!data.hasOwnProperty(broadcaster_id) || data[broadcaster_id] == false) {
		return res.send({message: "extension is currently not active on server"})
	} else {
		console.log(req);
		console.log(req.body);
		io.to(broadcaster_id).emit('event', {id: hindrance_id, text:req.body.text})
		return res.send({message: `successfully queue ${hindrance_id} for ${broadcaster_id} with text ${req.body.text}`})
	}
})

io.on('connection', socket => {
	socket.emit('connected', {message: "connected"})

	// check if registered or not 
	socket.on('register_room', msg => {
		socket.join(msg.id)

		// time to read in from a json file in the local directory
		// rawData = fs.readFileSync( "./broadcasters.json" );
		// data = JSON.parse(rawData); 
		data = require('./broadcasters.json')

		// set to true and write to json since they connected
		io.to(msg.id).emit('event', {message: "Connected as " + msg.id});
		data[msg.id] = true;

		// write to file and then send state to frontend to render buttons
		data = JSON.stringify(data, null, 2); 
		fs.writeFileSync("./broadcasters.json", data);

	})

	// deactivate them so buttons wont render
	socket.on('disconnected', msg => {

		// time to read in from a json file in the local directory
		// rawData = fs.readFileSync( "./broadcasters.json" );
		// data = JSON.parse(rawData); 
		data = require('./broadcasters.json')

		// set to false and write to json since they disconnected
		io.to(msg.id).emit('event', {message: "Disconnected as " + msg.id});
		data[msg.id] = false;

		// write to file and then send state to frontend to render buttons
		data = JSON.stringify(data, null, 2); 
		fs.writeFileSync("./broadcasters.json", data);

	})
})

server.listen(8081, () => {
	console.log("Working on port 8081")
})