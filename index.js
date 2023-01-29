import * as cheerio from "cheerio"

const URL = 'https://colombia.as.com/resultados/futbol/colombia_i/clasificacion/'
const response = await fetch(URL)
const html = await response.text()
const $ = cheerio.load(html)


let leaderboard = []

const getData = $('table tbody tr').each((index, el) =>{
	let itemData = []
	if (index < 20) {
		const team = $(el).find('.nombre-equipo').text()
		const tableData = $(el).find('td').text()
		
		for (const i in tableData) {
			if (tableData[i] !== " " && itemData.length < 7) {
				itemData.push(tableData[i])
			}
		}
	
		leaderboard =[...leaderboard, {
			team: team,
			puntos: itemData[0],
			jugados: itemData[1],
			ganados:  itemData[2],
			empates:  itemData[3],
			perdidos:  itemData[4],
			golesFavor:  itemData[5],
			golesContra:  itemData[6], 
		 }]
		itemData = []
	}
})
 
console.log(leaderboard)



