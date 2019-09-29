const serverPath = 'http://localhost:8081'

export function getRequest() {
	return fetch(serverPath + '/ping')
	.then(data => data.json())
}