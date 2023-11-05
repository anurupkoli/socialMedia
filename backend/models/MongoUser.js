const mongoose  = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    friends: {
        type:  Array,
        default: []
    },
    profilePic: {
        img: Buffer,
        contentType: String,
        uploadedAt: {type: Date, default: Date.now}
    },
    backgroundImg: {
        img: Buffer,
        contentType: String,
    },
    description: {
        type: String,
        default: ''
    },
    currentlyLiving: {
        type: String,
        default: ''
    },
    DOB: {
        type: Date,
        default: ""
    },
    relationshipStatus: {
        type: String,
        default: ""
    }
})


const User = mongoose.model('user', UserSchema)
module.exports = User;