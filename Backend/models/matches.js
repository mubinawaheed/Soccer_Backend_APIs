const mongoose = require('mongoose');
const { Schema } = mongoose

const matches=new Schema({
    opponent1:{
        type: String,
        required:true
    },
    opponent2:{
        type: String,
        required:true
    },
    Schedule:{
        type:Date
    }
})
module.exports=mongoose.model('Upcoming_Matches', matches)