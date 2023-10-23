require("dotenv").config();
const express = require("express");
const User = require("../models/MongoUser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWST = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUserD = require("../middlewares/fetchUser");
const multer = require('multer')
const jws_secret = process.env.JWT_TOKEN;

router.post(
  "/createUser",
  [
    body("name", "Enter Your Full Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("mobileNo", "Enter valid Mobile No").isNumeric(10),
    body("password", "Enter valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      let salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        mobileNo: req.body.mobileNo,
        date: Date.now(),
        // location: {
        //   latitude:
        // }
      });

      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = JWST.sign(data, jws_secret);
      res.status(200).json(authToken);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid Password").exists(),
  ],
  async (req, res) => {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      let secPassword = await bcrypt.compare(req.body.password, user.password);
      if (!secPassword) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = JWST.sign(data, jws_secret);
      res.status(200).json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

router.post("/getUser", fetchUserD, async (req, res) => {
  let userId = req.user.id;
  try {
    let data = await User.findById(userId).select("-password");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/followFriend", fetchUserD, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId);
    let friend = await User.findOne({ email: req.body.friendEmail });
    if (!friend) {
      return res.status(400).json("Invalid account");
    }

    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === req.body.friendEmail) {
        return res.status(400).json("He is already a friend");
      }
    }

    user = await User.updateOne(
      { _id: userId },
      { $push: { friends: req.body.friendEmail } }
    );
    return res.status(200).json("Friend Added");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/unfollowFriend", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    let user = await User.findById(userId);
    const friend = await User.findOne({ email: req.body.friendEmail });
    if (!friend) {
      return res.status(400).json("No such friend");
    }

    let isFriend = false;
    for(i=0; i<user.friends.length; i++){
      if(user.friends[i] === req.body.friendEmail){
        isFriend =  true;
      }
    }

    if(!isFriend){
      return res.status(400).json('He is not your friend')
    }

    user = await User.updateOne(
      {_id: userId },
      { $pull: { friends: req.body.friendEmail } }
      );
    res.status(200).json("Unfollowed friend");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

const Storage = multer.diskStorage({
  destination: 'images/uploadedProfilePic',
  filename: (req,file,cd)=>{
    cd(null, `${Date.now()}`+file.originalname)
  }
});

const uploadProfilePic = multer({
  storage: Storage
}).single('uploadImg')

router.post('/uploadProfilePic', fetchUserD,uploadProfilePic, async(req,res)=>{
  const userId = req.user.id;
  const imgFile = req.file;
  try {
    let user = await User.findById(userId);
    let profilePic = await User.findById(userId).select('profilePic')
    if(!user){
      return res.status(400).json('Invalid request')
    }
    if(!imgFile){
      return res.status(400).json('No such file')
    }

    user = await User.updateOne(
      {_id: userId},
      {$set: {
        profilePic: {
          img: imgFile.filename,
          contentType: 'image/jpg'
        }
      }}
    )
    res.status(200).json('Profile Pic uploaded')
  } catch (error) {
    
  }
})

module.exports = router;
