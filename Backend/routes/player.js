const express = require('express')
const Players = require('../models/players')
const { body, validationResult } = require('express-validator');
const router = express.Router();

// api for: CREATING A PLAYER
router.post('/create_player', [
    body('name').isLength({ min: 3 }),
    body('team').isLength({ min: 4 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "invalid player or team name", success: false })
        }

        const valid_team_names = ["En Fuego CF","Rush Hour","Hooligans FC", "Inter Real Hustlers FC", "Team Avengers", "Amigos", "Thunder"];
        if (!valid_team_names.includes(req.body.team)) {
            return res.status(400).send("Invalid team name");
          }
        let player = await Players.create({
            name: req.body.name,
            team: req.body.team,
            appearances: req.body.appearances,
            goals:req.body.goals,
            assist:req.body.assist,
            key_passes:req.body.key_passes,
            tackles:req.body.tackles,
            Cross_Accuracy:req.body.Cross_Accuracy,
            
        })
        return res.json({ player: player, success: "Player added successfully" })
    });

//API to fetch all the players
router.get('/players-performance', async (req, res) => {
    try {
        const users = await Players.find({})
            // console.log(users)
        res.json(users)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
});


//API to update a player
router.put('/update_player/:id', async(req, res)=>{
    try{
        let updated_player=await Players.findById(req.params.id)
        if (!updated_player) {
            return res.json({message:"Player not found"})
        }
        else{
            const {name, team, appearances, goals, assist,key_passes, tackles, Cross_Accuracy}=req.body
            const new_player={}
            if (name){
                new_player.name=name
            }
            if(team){
                new_player.team=team
            }
            if(appearances){
                new_player.appearances=appearances
            }
            if (goals){
                new_player.goals=goals
            }
            if(assist){
                new_player.assist=assist
            }
            if(key_passes){
                new_player.key_passes=key_passes
            }
            if(tackles){
                new_player.tackles=tackles
            }
            if(Cross_Accuracy){
                new_player.Cross_Accuracy=Cross_Accuracy
            }
    
            updated_player = await Players.findByIdAndUpdate(req.params.id, { $set: new_player }, { new: true })
            return res.json({data:updated_player, success:"player updated successfully"})
        }
    }
    catch(error){
        return res.status(500).json("error occured")
    }
})

// API to delete a player
router.get('/delete_player/:id', async (req,res)=>{
    try{

    
        let d_player=Players.findById(req.params.id)
        if (!d_player){
            return res.status(404).json("player not found")
        }
        else{
            player = await Players.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Player has been deleted" })
        }
    }
    catch(error){
        return res.status(404).json("player not found")

    }
})
module.exports = router;
