const serverPath = 'http://localhost:8081'

export function getRequest() {
	return fetch(serverPath + '/ping')
	.then(data => data.json())
}

export function requestHindrance(broadcaster_id, hindrance_id) {
	return fetch(`${serverPath}/hindrance/${broadcaster_id}/${hindrance_id}`)
	.then(data => data.json())
}

export function postHindranceMessage(broadcaster_id, hindrance_id, message) {
	console.log(message)
	return fetch(`${serverPath}/hindrance/${broadcaster_id}/${hindrance_id}`,
	{
		method: 'post',
		headers: {
      		'Content-Type': 'application/json'
		},
		body: JSON.stringify({text: message})
	})
	.then(data => data.json())
}
