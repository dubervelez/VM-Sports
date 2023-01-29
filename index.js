import * as cheerio from "cheerio"
import { writeFile } from "node:fs/promises"
import path from 'node:path'


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
	
		leaderboard = [...leaderboard, {
			team: team,
			points: itemData[0],
			gamesPlayed: itemData[1],
			wins:  itemData[2],
			draws:  itemData[3],
			losses:  itemData[4],
			goals:  itemData[5],
			goalsAllowed:  itemData[6], 
		 }]
		itemData = []
	}
})
 

const filePath = path.join(process.cwd(),'./db/leaderboard.json')

await writeFile(filePath, JSON.stringify(leaderboard, null, 2))