require("dotenv").config();
const express = require("express");
const User = require("../models/MongoUser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWST = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middlewares/fetchUser");
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

router.post("/login",[
  body("email", "Enter valid Email").isEmail(),
  body("password", "Enter valid Password").isLength({ min: 5 })
], async (req, res) => {
  let errors = await validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    let secPassword = await bcrypt.compare(req.body.password, user.password);
    if (!secPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    let data = {
      user: {
        id: user.Id,
      },
    };

    const authToken = JWST.sign(data, jws_secret);
    res.status(200).json(authToken);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


router.post('/getUser', fetchUser, async(req, res)=>{
  let userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

router.post("/followFriend", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId);
    let friend = await User.findOne({email: req.body.friendEmail})
    if(!friend){
      return res.status(400).json("Invalid account")
    }
    friend = false;
    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === req.body.friendEmail) {
        friend === true;
        return res.status(400).json('He is already a friend')
      }
    }
    if (friend === false) {
      user = await User.updateOne(
        { _id: userId },
        { $push: { friends: req.body.friendEmail } }
      );
      return res.status(200).json("Friend Added");
    }
    res.status(400).json("Friend could not be added");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
