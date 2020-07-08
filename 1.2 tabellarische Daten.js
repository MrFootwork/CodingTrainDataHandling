// Data from https://data.giss.nasa.gov/gistemp/
// mean from https://data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv

// Good CSV Parsers:
// D3
// p5.js

/**Good Graphing libraries
 * D3
 * Canvas API
 * p5.js
 * ===> Chart.js <===
 */

//TODO: Use own CSV data to draw
//TODO: use p5.js to draw myself on the canvas

chartIt()

async function chartIt() {
	const data = await getData()
	const ctx = document.getElementById('chart').getContext('2d')
	const chart = new Chart(ctx, {
		type    : 'line',
		data    : {
			labels   : data.xs,
			datasets : [
				{
					label           : 'Global Average Temperature',
					data            : data.ys,
					fill            : false,
					backgroundColor : 'rgba(255, 99, 132, 0.2)',
					borderColor     : 'rgba(255, 99, 132, 1)',
					borderWidth     : 2,
				},
			],
		},
		options : {
			scales : {
				yAxes : [
					{
						ticks : {
							callback : function(value, index, values) {
								return value + ' °C'
							},
						},
					},
				],
			},
		},
	})
}

async function getData() {
	const xs = []
	const ys = []

	const response = await fetch('ZonAnn.Ts+dSST.csv')
	const data = await response.text()
	const table = data.split('\n').slice(1)

	table.forEach(row => {
		const columns = row.split(',')
		const year = columns[0]
		const temp = columns[1]
		xs.push(year)
		ys.push(+temp + 14)
	})
	console.log({ xs, ys })
	return { xs, ys }
}
