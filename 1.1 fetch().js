// catchRainbow('rainbow', '../images/Shuttle-Icon.jpg').catch(error => {
// 	console.log('Oh nein! Das Shuttlecock konnte nicht geladen werden!')
// 	console.error(error)
// })
// catchRainbow('pandas', '../images/pandas.jpg').catch(error => {
// 	console.log('Oh nein! Die Pandas konnten nicht geladen werden!')
// 	console.error(error)
// })

const allTheImages = [
	[ 'shuttle', '../images/Shuttle-Icon.jpg' ],
	[ 'pandas', '../images/pandas.jpg' ],
	[ 'regex', '../images/regex.jpg' ],
	[ 'edabit', '../images/edabit.png' ],
]

catchAllImages(allTheImages).catch(error => {
	console.log('Irgendwas hat nicht geklappt...')
	console.error(error)
})
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

// const catchRainbow = async () => {} unterstützt KEIN hoisting!
async function catchRainbow(imageID, imagePath) {
	const image = document.createElement('img')
	document.body.appendChild(image)
	image.id = imageID
	const response = await fetch(imagePath)
	const blob = await response.blob()
	document.getElementById(imageID).src = URL.createObjectURL(blob)
	image.style.width = '300px'
}

/**
 * TODO fetch more than one image
 * TODO fetch an array of images
 * TODO file as text file and paste text to DOM 
 * 
 * 
 */
fetchText().catch(error => (console.log('ein Fehler!'), console.error(error)))
async function fetchText() {
	const domText = document.createElement('p')
	document.body.appendChild(domText)
	const response = await fetch('./poem.txt')
	const responseText = await response.text()
	domText.innerHTML = responseText
}
