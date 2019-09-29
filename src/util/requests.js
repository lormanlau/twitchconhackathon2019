let requests = {
	get: getRequest()
}

function getRequest() {
	return fetch("http://localhost:8081/ping")
}

export default requests