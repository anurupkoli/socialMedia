require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Posts = require("../models/UserPosts");
const User = require("../models/MongoUser");
const multer = require("multer");
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchUser = require("../middlewares/fetchUser");

const router = express.Router();

const Storage = multer.diskStorage({
  destination: "images/posts",
  filename: (req, file, cd) => {
    cd(null, `post${Date.now()}${file.originalname}`);
  },
});

const uploadPost = multer({
  storage: Storage,
}).single("uploadPost");

router.post("/uploadPost", fetchUser, uploadPost, async (req, res) => {
  const userId = req.user.id;
  const uploadPost = req.file;
  const description = req.body.description;
  try {
    let user = await User.findById(userId);
    if (!user) {
      res.status(400).json("User not found");
    }
    let post = await Posts.create({
      user: userId,
      description: description,
      postImg: {
        img: uploadPost.filename,
        contentType: "image/jpg",
      },
    });
    res.status(200).json("Post Uploaded");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/getPosts", fetchUser, async (req, res) => {
  let userId = req.user.id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("No user found");
    }

    const posts = await Posts.find({user: {$in: [userId, ...user.friends]}});
    if (!posts) {
      return res.status(400).json("No posts found");
    }

    const response = posts.map((post) => ({
      name: post.user.name,
      description: post.description,
      postImg: post.postImg,
      likes: post.likes,
      comments: post.comments,
      createdAt: post.createdAt,
    }));
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/updatePost/:id", fetchUser, uploadPost, async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const updatedImage = req.file;
  const updatedDesc = req.body.description;
  try {
    let post = await Posts.findById(postId);
    if (post.user.toString() !== userId) {
      res.status(400).json("Authenticaion Revoked");
    }
    let updatedPost = {
        postImg: post.postImg,
        description:  post.description
    };
    if (updatedImage) {
      updatedPost.postImg.img = updatedImage.filename,
      updatedPost.postImg.contentType = "image/jpg"
    }
    if(updatedDesc){
        updatedPost.description = updatedDesc
    }
    post = await Posts.findByIdAndUpdate(
        postId,
        {$set: updatedPost},
        {new: true}
    )
    res.status(200).json("Post Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/updateLikes/:id', async(req, res)=>{
    let postId = req.params.id;
    let friendEmail = req.body.friendEmail;
    let didLike = req.body.didLike;
    try {
        let post = await Posts.findById(postId);
        if(!post){
          return res.status(400).json('Invalid request')
        }

        if(didLike === false && post.likes.emails.includes(friendEmail)){
          post.likes.emails = post.likes.emails.filter(email=>email !== email)
          post.likes.count -= 1;
          await post.save();
          return res.status(200).json('Post Unliked')
        }
        if(didLike === false && !post.likes.emails.includes(friendEmail)){
          return res.status(400).json('Cannot do that')
        }
        if(didLike === true && post.likes.emails.includes(friendEmail)){
          return res.status(400).json('Already Liked')
        }
        post.likes.emails.push(friendEmail);
        post.likes.count += 1;
        await post.save();
        res.status(200).json('post Liked')
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

router.delete("/deletePost/:id", fetchUser, async (req, res) => {
  let postId = req.params.id;
  try {
    let post = await Posts.findById(postId);
    if (!post) {
      return res.status(400).json("No such post");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json("Authentication revoked");
    }
    let deletedPost = await Posts.findByIdAndDelete(postId);
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
