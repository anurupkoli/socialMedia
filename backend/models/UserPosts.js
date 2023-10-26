const mongoose = require("mongoose");

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
    comments: {
      email: {
        type: Array,
        default: [],
      },
      comment: {
        type: Array,
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", PostSchema);
module.exports = Posts;
