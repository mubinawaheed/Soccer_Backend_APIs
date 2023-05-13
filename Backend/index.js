
const connectToMongo = require('./db')
connectToMongo()
const bodyParser = require('body-parser')

const express = require('express')

const app = express()
const port = 3000

const team_info_routes = require('./routes/player')
const upcomingmatches=require('./routes/match_info')
const scorecard=require('./routes/scorecard')
//middleware required for request
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/team', team_info_routes)
app.use('/team', upcomingmatches)
app.use('/team', scorecard)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});