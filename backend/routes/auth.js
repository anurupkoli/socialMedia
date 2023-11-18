require("dotenv").config();
const express = require("express");
const User = require("../models/MongoUser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWST = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUserD = require("../middlewares/fetchUser");
const multer = require("multer");
const crypto = require("crypto");
const jws_secret = process.env.JWT_TOKEN;

//Post route to create new user using 'api/auth/createUser'
router.post(
  "/createUser",
  [
    body("name", "Enter Your Full Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("mobileNo", "Enter valid Mobile No").isNumeric(10),
    body("password", "Enter valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //checking if provided details are valid
    let errors = await validationResult(req);

    //if errors were found return error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Checking if user is already present
      let user = await User.findOne({ email: req.body.email });
      //If present return error
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      let salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      //If not then creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        mobileNo: req.body.mobileNo,
        date: Date.now(),
      });

      //Using user._id as a subscript for authentication token with jws_secret
      //jsw_secret is in .env file
      let data = {
        user: {
          id: user.id,
        },
      };
      const authToken = JWST.sign(data, jws_secret);

      //Responding with jws token as a response
      res.status(200).json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

//Post route to loing user using 'api/auth/login'
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid Password").exists(),
  ],
  async (req, res) => {
    //checking if provided details are valid
    let errors = await validationResult(req);

    //if errors were found return error array
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      //Checking if user is present in database
      const user = await User.findOne({ email: req.body.email });
      //if not present then respond with error
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      //If user is present then check for correct password
      let secPassword = await bcrypt.compare(req.body.password, user.password);
      //If incorrect password respond with error
      if (!secPassword) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      //If login is successfull respond with JWT
      const authToken = JWST.sign(data, jws_secret);
      res.status(200).json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

//Get route to get user details using 'api/auth/getUser'
//fetchUserD is a middleware that uses authentication token to fetch user
router.get("/getUser", fetchUserD, async (req, res) => {
  //userId is fetched through authentication token
  let userId = req.user.id;
  try {
    //fetching user from datase except password
    let user = await User.findById(userId).select("-password,-profilePic");
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Post route to update user using 'api/auth/updateUser'
//fetchUserD is a middleware that uses authentication token to fetch user
router.post("/updateUser", fetchUserD, async (req, res) => {
  //userId is fetched through authentication token
  const userId = req.user.id;
  try {
    //fetching user from datase
    let user = await User.findById(userId);

    //if user was not found then return with error
    if (!user) {
      return res.status(400).json("No such user");
    }

    let updateUser = {};

    //destructuring user details that needs to be updated from URL Body
    let { description, currentlyLiving, name, DOB, relationshipStatus } =
      req.body;

    //setting desired detail that needs to be updated
    if (description) {
      updateUser.description = description;
    }
    if (currentlyLiving) {
      updateUser.currentlyLiving = currentlyLiving;
    }
    if (name) {
      updateUser.name = name;
    }
    if (DOB) {
      updateUser.DOB = DOB;
    }
    if (relationshipStatus) {
      updateUser.relationshipStatus = relationshipStatus;
    }

    //updating user details
    user = await User.findByIdAndUpdate(
      userId,
      { $set: updateUser },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Post route to follow a friend using 'api/auth/followFriend'
//fetchUserD is a middleware that uses authentication token to fetch user
router.post("/followFriend", fetchUserD, async (req, res) => {
  try {
    let userId = req.user.id;

    //fetching friend id from URL Body
    let friendId = req.body.friendId;
    let user = await User.findById(userId);

    //Checking if friend's account is present in database
    let friend = await User.findById(friendId);
    //if not then return with \error
    if (!friend) {
      return res.status(400).json("Invalid account");
    }

    //Checking if friend's id is already present in user's friend list
    //if is present return with error
    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friendId) {
        return res.status(400).json("He is already a friend");
      }
    }

    //Updating user's account and adding friend's id to friend list
    user = await User.updateOne(
      { _id: userId },
      { $push: { friends: req.body.friendId } }
    );

    //Updating friend's account and adding user's id to friend list
    friend = await User.updateOne(
      { _id: friendId },
      { $push: { friends: userId } }
    );
    return res.status(200).json("Friend Added");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//Post route to unfollow a friend using 'api/auth/unfollowFriend'
//fetchUserD is a middleware that uses authentication token to fetch user
router.post("/unfollowFriend", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  let friendId = req.body.friendId;
  try {
    //fetching user and friend details from database
    let user = await User.findById(userId);
    let friend = await User.findOne({ _id: friendId });

    //if friend's account was not found return with error
    if (!friend) {
      return res.status(400).json("No such friend");
    }

    //Checking if friendId is present in user's friend list
    let isFriend = false;
    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friendId) {
        isFriend = true;
      }
    }

    //if friendId is not present return with error
    if (!isFriend) {
      return res.status(400).json("He is not your friend");
    }

    //if friend id is present then update user's friend list as well as friend's friend list
    user = await User.updateOne(
      { _id: userId },
      { $pull: { friends: friendId } }
    );
    friend = await User.updateOne(
      { _id: friendId },
      { $pull: { friends: userId } }
    );
    res.status(200).json("Unfollowed friend");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//Get route to fetch profile details of all friends using 'api/auth/getFriendDetails'
//fetchUserD is a middleware that uses authentication token to fetch user
router.get("/getFriendsDetails", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    //fetching friend list from user's profile from database
    const user = await User.findById(userId).select("friends");

    if (!user) {
      return res.status(400).json("User not found");
    }

    //if not friend's were found return with error
    if (!user.friends || user.friends.length === 0) {
      return res.status(200).json("No friends found");
    }

    //fetching all friends profiles as an array
    const friendDetails = await User.find({ _id: { $in: user.friends } });

    //structuring response as per required details of all friends
    let response = await Promise.all(
      friendDetails.map((friend) => {
        return {
          id: friend._id,
          name: friend.name,
          description: friend.description,
          profilePicPath: `/uploadedProfilePic/${friend.profilePic.img}`,
          backgroundImgPath: `/uploadedBackgroundPic/${friend.backgroundImg.img}`,
          DOB: friend.DOB,
          currentlyLiving: friend.currentlyLiving
            ? friend.currentlyLiving
            : "N/A",
          relationshipStatus: friend.relationshipStatus,
        };
      })
    );
    res.status(200).json({ friends: response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Get route to fetch profile details of all friends that are not followed by user using 'api/auth/getUnfollowedFriends'
//fetchUserD is a middleware that uses authentication token to fetch user
router.get("/getUnfollwedFriends", fetchUserD, async (req, res) => {
  let userId = req.user.id;
  try {
    //fetching user details from database
    const user = await User.findById(userId);
    //return with error if not found
    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }

    //fetching all friend's that are not in user's friend list and user himself
    const friends = await User.find(
      { _id: { $nin: [...user.friends, userId] } },
      "_id name profilePic"
    );

    //structuring response as per required details of unfollowed friends
    const response = await Promise.all(
      friends.map((friend) => {
        return {
          id: friend._id,
          name: friend.name,
          profilePic: `${friend.profilePic.img}`,
        };
      })
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//creating middleware to store a image file.....could have creted seperate middleware....will do it in future
//Defining storage argument for multer...uploadedProfilePics are stored in images/uploadedProfilePic file
const Storage1 = multer.diskStorage({
  destination: "images/uploadedProfilePic",
  filename: (req, file, cd) => {
    cd(null, "profilePic" + `${Date.now()}` + file.originalname);
  },
});

//storing file with key as uploadImg from URL Body
const uploadProfilePic = multer({
  storage: Storage1,
}).single("uploadImg");

//Post route to upload profilePic using 'api/auth/uploadProfilePic'
//fetchUserD is a middleware that uses authentication token to fetch user
router.post(
  "/uploadProfilePic",
  fetchUserD,
  uploadProfilePic,
  async (req, res) => {
    const userId = req.user.id;

    //fetching file from URL Body
    const imgFile = req.file;
    try {
      //fetching user from database
      let user = await User.findById(userId);

      //if user is not present reuturn with error
      if (!user) {
        return res.status(400).json("Invalid request");
      }

      //if invalid image file path then return with error
      if (!imgFile) {
        return res.status(400).json("No such file");
      }

      //updating user's profilePic path with new profilePic's path
      user = await User.updateOne(
        { _id: userId },
        {
          $set: {
            profilePic: {
              img: imgFile.filename,
              contentType: "image/jpg",
            },
          },
        }
      );
      res.status(200).json("Profile Pic uploaded");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

//creating middleware to store a image file.....could have creted seperate middleware....will do it in future
//Defining storage argument for multer...uploadedBackgroundPic are stored in images/uploadedBackgroundPic file
const Storage2 = multer.diskStorage({
  destination: "images/uploadedBackgroundPic",
  filename: (req, file, cd) => {
    cd(null, "backgroundPic" + `${Date.now()}` + file.originalname);
  },
});

//storing file with key as uploadBackgroundPic from URL Body
const uploadBackgroundPic = multer({
  storage: Storage2,
}).single("uploadBackgroundPic");

//Post route to upload backgroundPic using 'api/auth/uploadBackgroundPic'
//fetchUserD is a middleware that uses authentication token to fetch user
router.post(
  "/uploadBackgroundPic",
  fetchUserD,
  uploadBackgroundPic,
  async (req, res) => {
    const userId = req.user.id;

    //fetching image file from URL Body
    const imgFile = req.file;
    try {
      //fetching user from database
      let user = await User.findById(userId);
      //if not found return with error
      if (!user) {
        return res.status(400).json("Invalid request");
      }

      //if invalid image file path then return with error
      if (!imgFile) {
        return res.status(400).json("No such file");
      }

      //updating user's backgroundPic path with new backgroundPic's path
      user = await User.updateOne(
        { _id: userId },
        {
          $set: {
            backgroundImg: {
              img: imgFile.filename,
              contentType: "image/jpg",
            },
          },
        }
      );
      res.status(200).json("Background Pic uploaded");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);


//Get route fetch user's profilePic using 'api/auth/getProfilePic'......Could have implemented better...that's fine do not want to waste time
//fetchUserD is a middleware that uses authentication token to fetch user
router.get("/getProfilePic", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    //fetching user from database
    const user = await User.findById(userId);
    //if not present return with error
    if (!user) {
      return res.status(400).json("User not found");
    }
    //if profilePic is not present return with error
    if (!user.profilePic || !user.profilePic.img) {
      return res.status(400).json("Profile Pic not found");
    }

    //setting response contentType as image/jpg format
    res.contentType(user.profilePic.contentType);
    res.status(200).send("/uploadedProfilePic/" + user.profilePic.img);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Get route to fetch user's backgroundPic using 'api/auth/getBackgroundPic'..could have implemented better....not wasting time
//fetchUserD is a middleware that uses authentication token to fetch user
router.get("/getBackgroundPic", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    //fetching user from database
    const user = await User.findById(userId);
    //if not present return with error
    if (!user) {
      return res.status(400).json("User not found");
    }

    //if backgroundPic is not present return with error
    if (!user.backgroundImg || !user.backgroundImg.img) {
      return res.status(400).json("Background Pic not found");
    }

    //setting response contentType as image/jpg
    res.contentType(user.backgroundImg.contentType);
    res.status(200).send("/uploadedBackgroundPic/" + user.backgroundImg.img);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete route to delte profilePic using 'api/auth/removeProfilePic'
//fetchUserD is a middleware that uses authentication token to fetch user
router.delete("/removeProfilePic", fetchUserD, async (req, res) => {
  let userId = req.user.id;
  try {
    //fetching user from database
    let user = await User.findById(userId);
    //if not then return with error
    if (!user) {
      return res.status(400).json("No user found");
    }

    //If profilePic is not present then return with error
    if (!user.profilePic || !user.profilePic.img) {
      return res.status(400).json("No Profile Pic to delete");
    }

    //deleting profilePic's path from user's profile
    user.profilePic = null;
    await user.save();
    res.status(200).json("Profile Pic deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
