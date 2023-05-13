const mongoose = require('mongoose')
mongouri = "mongodb://localhost:27017/soccer"

const connectToMongo = () => {
    mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
};


module.exports = connectToMongo;