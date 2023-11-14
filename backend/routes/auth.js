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
      });

      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = JWST.sign(data, jws_secret);
      res.status(200).json({ authToken });
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

router.get("/getUser", fetchUserD, async (req, res) => {
  let userId = req.user.id;
  try {
    let user = await User.findById(userId).select("-password,-profilePic");
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/updateUser", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("No such user");
    }

    let updateUser = {};
    let { description, currentlyLiving, name, DOB, relationshipStatus } =
      req.body;
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

router.post("/followFriend", fetchUserD, async (req, res) => {
  try {
    let userId = req.user.id;
    let friendId = req.body.friendId;
    let user = await User.findById(userId);
    let friend = await User.findById(friendId);
    if (!friend) {
      return res.status(400).json("Invalid account");
    }

    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friendId) {
        return res.status(400).json("He is already a friend");
      }
    }

    user = await User.updateOne(
      { _id: userId },
      { $push: { friends: req.body.friendId } }
    );
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

router.post("/unfollowFriend", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  let friendId = req.body.friendId;
  try {
    let user = await User.findById(userId);
    let friend = await User.findOne({ _id: friendId });
    if (!friend) {
      return res.status(400).json("No such friend");
    }

    let isFriend = false;
    for (i = 0; i < user.friends.length; i++) {
      if (user.friends[i] === friendId) {
        isFriend = true;
      }
    }

    if (!isFriend) {
      return res.status(400).json("He is not your friend");
    }

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

router.get("/getFriendProfileDetails", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    let friends = User.findById(userId).select("friends");
    if (!friends) {
      return res.status(400).json("No friends found");
    }
    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/getFriendsDetails", fetchUserD, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("friends");

    if (!user) {
      return res.status(400).json("User not found");
    }
    if (!user.friends || user.friends.length === 0) {
      return res.status(200).json("No friends found");
    }

    const friendDetails = await User.find({ _id: { $in: user.friends } });
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

router.get("/getUnfollwedFriends", fetchUserD, async (req, res) => {
  let userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }
    const friends = await User.find(
      { _id: { $nin: [...user.friends, userId] } },
      "_id name profilePic"
    );
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

const Storage1 = multer.diskStorage({
  destination: "images/uploadedProfilePic",
  filename: (req, file, cd) => {
    cd(null, "profilePic" + `${Date.now()}` + file.originalname);
  },
});

const uploadProfilePic = multer({
  storage: Storage1,
}).single("uploadImg");

router.post(
  "/uploadProfilePic",
  fetchUserD,
  uploadProfilePic,
  async (req, res) => {
    const userId = req.user.id;
    const imgFile = req.file;
    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json("Invalid request");
      }
      if (!imgFile) {
        return res.status(400).json("No such file");
      }
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

const Storage2 = multer.diskStorage({
  destination: "images/uploadedBackgroundPic",
  filename: (req, file, cd) => {
    cd(null, "backgroundPic" + `${Date.now()}` + file.originalname);
  },
});

const uploadBackgroundPic = multer({
  storage: Storage2,
}).single("uploadBackgroundPic");

router.post(
  "/uploadBackgroundPic",
  fetchUserD,
  uploadBackgroundPic,
  async (req, res) => {
    const userId = req.user.id;
    const imgFile = req.file;
    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json("Invalid request");
      }
      if (!imgFile) {
        return res.status(400).json("No such file");
      }
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

router.get("/getProfilePic", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("User not found");
    }
    if (!user.profilePic || !user.profilePic.img) {
      return res.status(400).json("Profile Pic not found");
    }
    res.contentType(user.profilePic.contentType);
    res.status(200).send("/uploadedProfilePic/" + user.profilePic.img);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/getBackgroundPic", fetchUserD, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("User not found");
    }
    if (!user.backgroundImg || !user.backgroundImg.img) {
      return res.status(400).json("Background Pic not found");
    }
    res.contentType(user.backgroundImg.contentType);
    res.status(200).send("/uploadedBackgroundPic/" + user.backgroundImg.img);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/removeProfilePic", fetchUserD, async (req, res) => {
  let userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("No user found");
    }
    if (!user.profilePic || !user.profilePic.img) {
      return res.status(400).json("No Profile Pic to delete");
    }
    user.profilePic = null;
    await user.save();
    res.status(200).json("Profile Pic deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
