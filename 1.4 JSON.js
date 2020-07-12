// Making a map and tiles
const mymap = L.map('issMap').setView([ 0, 0 ], 1)
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)

// Making a marker with a custom icon
const issIcon = L.icon({
	iconUrl    : 'ISS_Icon.png',
	iconSize   : [ 100, 100 ],
	iconAnchor : [ 50, 50 ],
})
let marker = L.marker([ 0, 0 ], { icon: issIcon }).addTo(mymap)

// Making a GeoJSON layer (path)
var pathISS = []
var pathStyle = {
	color   : '#ff7800',
	weight  : 5,
	opacity : 0.65,
}
var path

//zoom
mymap.on('zoomend', function() {
	const zoom = mymap.getZoom()
	const w = 50 * zoom
	const h = 50 * zoom
	issIcon.options.iconSize = [ w, h ]
	issIcon.options.iconAnchor = [ w / 2, h / 2 ]
	mymap.removeLayer(marker)
	let latlng = marker.getLatLng()
	marker = L.marker([ 0, 0 ], { icon: issIcon }).addTo(mymap)
	marker.setLatLng(latlng)
})

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
let firstTime = true

async function getISS() {
	const response = await fetch(api_url)
	const data = await response.json()
	const { latitude, longitude } = data

	if (firstTime) {
		mymap.setView([ latitude, longitude ], 5)
		path = L.polyline(pathISS, { color: 'green' }).addTo(mymap)
		firstTime = false
	}
	//map update
	mymap.panTo([ latitude, longitude ], {
		animate       : true,
		duration      : 2,
		easeLinearity : 1,
	})
	//marker update
	marker.setLatLng([ latitude, longitude ])
	//path update
	pathISS.push([ latitude, longitude ])
	mymap.removeLayer(path)
	path = L.polyline(pathISS, { style: pathStyle }).addTo(mymap)
	//display as text
	document.getElementById('lat').textContent = latitude.toFixed(2)
	document.getElementById('lon').textContent = longitude.toFixed(2)
}

getISS()
setInterval(getISS, 2000)
