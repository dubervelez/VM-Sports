import express from "express";
import leaderboard from '../db/leaderboard.json' assert { type: 'json' }  


const app =  express()

//
app.get('/', (req, res)=>{
    res.json([
        {
            enponint: '/leaderboard',
            description: 'Returns the classification of the Colombian soccer league' 
        }
    ])
})

app.get('/leaderboard', (req, res)=>{
    console.log('haciendo get')
    res.json(leaderboard)
})



app.listen(5000, ()=>{
    console.log('escuchando el puerto 5000')
})
  