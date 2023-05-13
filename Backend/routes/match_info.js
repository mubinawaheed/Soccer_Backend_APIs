const express = require('express')
const Matches = require('../models/matches')
const { body, validationResult } = require('express-validator');
const router = express.Router();


router.get('/Upcoming-Matches', async (req, res) => {
    try {
        const matches = await Matches.find({})
        const [...m1]=matches
        const k=[]
        const options = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
        const timings=m1.map(match=>({Schedule:match.Schedule.toLocaleString('en-US', options)}))
    
        for (let i = 0; i < m1.length; i++) {
            let obj={
                opponent1:m1[i].opponent1,
                opponent2:m1[i].opponent2,
                Schedule:timings[i].Schedule  
            }
            k.push(obj)
        }
        return res.json(k)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
});

router.post('/create_match', async (req, res) => {
    
    
    const valid_team_names = ["En Fuego CF", "Rush Hour", "Hooligans FC", "Inter Real Hustlers FC", "Team Avengers", "Amigos", "Thunder"];
    if ((!valid_team_names.includes(req.body.opponent1)) || (!valid_team_names.includes(req.body.opponent2))) {
        return res.status(400).send("team not found");
    }

    if (req.body.opponent1===req.body.opponent2){
        return res.json({message:"team cannot play against itself"})
    }
    let match = await Matches.create({
        opponent1: req.body.opponent1,
        opponent2: req.body.opponent2,
        Schedule: req.body.Schedule
    })
    return res.json({ match: match, success: "Match scheduled successfully" })
})



module.exports = router;
