const mongoose = require('mongoose')
const mongoURL = 'mongodb://127.0.0.1/SocialApp';
const mongoServer = ()=>{
    mongoose.connect(mongoURL, {useNewUrlParser: true});
    console.log('Connected to Mongo Server');
}

module.exports = mongoServer;