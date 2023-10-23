const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        default: 'No description'
    },
    postImg: {
        type: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

const Posts = mongoose.model('posts', PostSchema);
module.exports = Posts;