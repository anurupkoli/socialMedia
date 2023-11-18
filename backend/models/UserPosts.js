//Post Schema for user
const mongoose = require("mongoose");

//comment schema created seperately as it stores multiple info in the form of object
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);


//Actual post Schema
const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    description: {
      type: String,
      default: "No description",
    },
    postImg: {
      img: Buffer,
      contentType: String,
    },
    likes: {
      emails: {
        type: Array,
        default: [],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", PostSchema);
module.exports = Posts;
