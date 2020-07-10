const locationURL = 'https://api.wheretheiss.at/v1/satellites/25544'

const headline = document.createElement('h1')
headline.innerHTML = 'Where is the ISS?'
document.body.appendChild(headline)

async function getISS() {
	const response = await fetch(locationURL)
	const data = await response.json()
	const { latitude, longitude } = data

	const position = document.createElement('p')
	position.innerHTML = `Latitude : ${latitude} <br> Longitude: ${longitude}`
	document.body.appendChild(position)
}

async function timerISS() {
	setInterval(await getISS(), 1000)
}

timerISS()
