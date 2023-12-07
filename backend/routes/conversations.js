const express = require("express");
const router = express.Router();
const Conversations = require("../models/Conversations");
const fetchUser = require("../middlewares/fetchUser");

//Creating new Conversation using /createConversation route

router.post("/createConversation", fetchUser, async (req, res) => {
  const userId = req.user.id;
  const friendId = req.body.friendId;
  try {
    let conversation = await Conversations.findOne({
       users: {$all: [userId, friendId]}
    });
    if (conversation) {
      return res.status(400).json("Conversation already created");
    }

    conversation = await Conversations.create({
      users: [userId, friendId],
    });
    res.status(200).json("New Conversation Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/getConversations', fetchUser, async(req, res)=>{
    const userId = req.user.id;
    try {
        let conversations = await Conversations.find({
            users: {$in: userId}
        })
        if(conversations){
            return res.status(200).json(conversations)
        }
        res.status(400).json('No conversations found');
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;