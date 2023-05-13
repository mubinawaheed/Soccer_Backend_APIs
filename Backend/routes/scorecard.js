const express = require('express')
const ScoreCard = require('../models/score_card')
const { body, validationResult } = require('express-validator');
const router = express.Router();


router.get('/scorecard', async(req,res)=>{
    const scorecard= await ScoreCard.find({})
    return res.json(scorecard)
})

router.post('/create_Score_Card', async(req,res)=>{
    const valid_team_names = ["En Fuego CF", "Rush Hour", "Hooligans FC", "Inter Real Hustlers FC", "Team Avengers", "Amigos", "Thunder"];
    if ((!valid_team_names.includes(req.body.opponent1)) || (!valid_team_names.includes(req.body.opponent2))) {
        // console.log(req.body)
        return res.status(400).send("team not found");
    }
    if(req.body.opponent1===req.body.opponent2){
        return res.status(400).send("Enter correct team names")
    }

    new_score=await ScoreCard.create({
        opponent1:req.body.opponent1,
        opponent2:req.body.opponent2,
        GoalKeeperSave:req.body.GoalKeeperSave,
        HighestScorer: req.body.HighestScorer,
        Most_assists:req.body.Most_assists,
        BestDefence:req.body.BestDefence
    })

    return res.json({score:new_score, success:"Score card created successfully"})
})

module.exports=router;