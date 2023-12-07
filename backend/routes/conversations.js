const express = require("express");
const router = express.Router();
const Conversations = require("../models/Conversations");
const fetchUser = require("../middlewares/fetchUser");

//Creating new Conversation using /createConversation route
router.post("/createConversation", fetchUser, async (req, res) => {
    //fetching userId from req.user
  const userId = req.user.id;
  const friendId = req.body.friendId;
  try {
    //trying to find if conversation has been already initiated
    let conversation = await Conversations.findOne({
       users: {$all: [userId, friendId]}
    });

    //if found return with error
    if (conversation) {
      return res.status(400).json("Conversation already created");
    }

    //creating new conversation
    conversation = await Conversations.create({
      users: [userId, friendId],
    });
    res.status(200).json("New Conversation Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//fetching conversations of user using /getConversations route
router.get('/getConversations', fetchUser, async(req, res)=>{
    //fetching userId from user.id
    const userId = req.user.id;
    try {
        //finding if conversations exist
        let conversations = await Conversations.find({
            users: {$in: userId}
        })

        if(conversations){
            return res.status(200).json(conversations)
        }
        
        //if no conversations return with error
        res.status(400).json('No conversations found');
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;