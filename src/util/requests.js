const serverPath = 'https://localhost:8081'

export function getRequest() {
	return fetch(serverPath + '/ping')
	.then(data => data.json())
}

export function requestHindrance