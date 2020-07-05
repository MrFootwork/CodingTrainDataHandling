console.log('about to fetch a rainbow')

const rainbowImage = document.createElement('img')
console.log('created image tag')

document.body.appendChild(rainbowImage)
console.log('appended image to DOM')

rainbowImage.id = 'rainbow'
console.log('assigned rainbow ID to DOM tag')

catchRainbow().catch(error => {
	console.log('Oh nein! Das Shuttlecock konnte nicht geladen werden!')
	console.error(error)
})

// const catchRainbow = async () => {} unterstützt KEIN hoisting!
async function catchRainbow() {
	const response = await fetch('../images/Shuttle-Icon.jpg')
	const blob = await response.blob()
	document.getElementById('rainbow').src = URL.createObjectURL(blob)
	rainbowImage.style.width = '300px'
}

/**
 * TODO: fetch more than one image
 * TODO: fetch an array of images
 * TODO: file as text file and paste text to DOM 
 * 
 * 
 */
