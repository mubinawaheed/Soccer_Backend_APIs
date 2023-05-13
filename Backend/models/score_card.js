const mongoose = require('mongoose');
const { Schema } = mongoose

const scorecardSchema = new Schema({
    opponent1: {
        type: String,
        required: true
    },

    opponent2: {
        type: String,
        required: true
    },
    GoalKeeperSave: {
        type: Number,
        required: true
        // default: 0

    },
    HighestScorer:{
        type: String,
        required: true
        // default: 0

    },

    Most_assists: {
        type: String,
        required: true
        // default: 0

    },

    BestDefence: {
        type: String,
        required: true
    }
   
});

module.exports = mongoose.model('ScoreCard', scorecardSchema)