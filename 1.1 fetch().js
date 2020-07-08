const IMAGES = [
	[ 'shuttle', '../images/Shuttle-Icon.jpg' ],
	[ 'pandas', '../images/pandas.jpg' ],
	[ 'regex', '../images/regex.jpg' ],
	[ 'edabit', '../images/edabit.png' ],
]

/**||||||||||||||||||||||||||||||
 * 	  Fetch an array of images (parallel)
 * |||||||||||||||||||||||||||||
 */
catchImagesParallel(IMAGES).then(console.log('catchImagesParallel running...')).catch(error => {
	console.log('There occurred an error! What the heck happened?')
	console.error(error)
})
async function catchImagesParallel(arrImages) {
	for (let i = 0; i < arrImages.length; i++) {
		const imageTag = document.createElement('img')
		document.body.appendChild(imageTag)
		imageTag.id = arrImages[i][0]
	}
	let responses = []
	let blobs = []

	await Promise.all(arrImages.map(async (path, i) => (responses[i] = await fetch(path[1]))))
	await Promise.all(responses.map(async (response, i) => (blobs[i] = await response.blob())))

	for (let i = 0; i < arrImages.length; i++) {
		const imageTag = document.getElementById(arrImages[i][0])
		imageTag.src = URL.createObjectURL(blobs[i])
		imageTag.style.width = '150px'
	}
}

/**||||||||||||||||||||||||||||||
 * 	  Fetch an array of images (sequential)
 * |||||||||||||||||||||||||||||
 */
// catchAllImages(IMAGES).catch(error => {
// 	console.log('Irgendwas hat nicht geklappt...')
// 	console.error(error)
// })
async function catchAllImages(arrImages) {
	const response = []
	const blob = []
	for (let i = 0; i < arrImages.length; i++) {
		const imageTag = document.createElement('img')
		document.body.appendChild(imageTag)
		imageTag.id = arrImages[i][0]
		response[i] = await fetch(arrImages[i][1])
		blob[i] = await response[i].blob()
		imageTag.src = URL.createObjectURL(blob[i])
		imageTag.style.width = '300px'
	}
}

/**||||||||||||||||||||||||||||||
 * 			Fetch a picture
 * |||||||||||||||||||||||||||||
 * const catchRainbow = async () => {} unterstützt KEIN hoisting!
 */
// catchRainbow('rainbow', '../images/Shuttle-Icon.jpg').catch(error => {
// 	console.log('Oh nein! Das Shuttlecock konnte nicht geladen werden!')
// 	console.error(error)
// })
// catchRainbow('pandas', '../images/pandas.jpg').catch(error => {
// 	console.log('Oh nein! Die Pandas konnten nicht geladen werden!')
// 	console.error(error)
// })

async function catchRainbow(imageID, imagePath) {
	const image = document.createElement('img')
	document.body.appendChild(image)
	image.id = imageID
	const response = await fetch(imagePath)
	const blob = await response.blob()
	document.getElementById(imageID).src = URL.createObjectURL(blob)
	image.style.width = '300px'
}

/**||||||||||||||||||||||||||||||
 * 			Fetch a Text
 * |||||||||||||||||||||||||||||
 */
// fetchText().catch(error => (console.log('ein Fehler!'), console.error(error)))
async function fetchText() {
	const domText = document.createElement('p')
	document.body.appendChild(domText)
	const response = await fetch('./poem.txt')
	const responseText = await response.text()
	domText.innerHTML = responseText
}
