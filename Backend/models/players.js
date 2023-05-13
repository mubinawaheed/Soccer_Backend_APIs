const mongoose = require('mongoose');
const { Schema } = mongoose

const player = new Schema({
    name: {
        type: String,
        required: true
    },

    team: {
        type: String,
        required: true
    },
    appearances: {
        type: Number,
        required: true,
        // default: 0

    },
    goals: {
        type: Number,
        required: true,
        // default: 0

    },

    assist: {
        type: Number,
        required: true,
        // default: 0

    },

    key_passes: {
        type: Number,
        required: true,
        // default: 0

    },
    tackles: {
        type: Number,
        required: true,
        // default: 0
    }
    ,
    Cross_Accuracy: {
        type: Number,
        required: true,
        // default: 0

    }
});

module.exports = mongoose.model('Players', player)