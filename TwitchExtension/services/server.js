const express = require('express');
const cors = require('cors')
var app = express();

app.use(cors())

app.get('/', (req, res) => {
	res.send({message: "hello world"})
})

app.get('/ping', (req, res) => {
	res.send({message: 'pong'})
})

app.listen(8081, () => {
	console.log("Working on port 8081")
})