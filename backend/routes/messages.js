const express = require('express');
const router = express.Router();
const Messages = require('../models/Messages');
const fetchUser = require('../middlewares/fetchUser');
const Conversations = require('../models/Conversations');

//creating new messages with /sendMessage route
router.post('/sendMessage', fetchUser, async(req,res)=>{
    //fetching userId, text, conversationId
    const userId = req.user.id;
    const text = req.body.text;
    const conversationId = req.body.conversationId;
    try {
        //returning with error if userId was not found
        if(!userId){
            return res.status(400).json('Authentication revoked');
        }

        //trying to find if conversation with provided id exists
        const conversation = await Conversations.findOne({
             _id: conversationId
        })
        //if not then return with error
        if(!conversation){
            return res.status(400).json('Invalid request');
        }
        
        if(!conversation.users.includes(userId)){
            return res.status(400).json('Invalid conversationId');
        }

        //creating new message
        const messages = await Messages.create({
            conversationId: conversationId,
            sender: userId,
            text: text
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.post('/getMessages', fetchUser, async(req,res)=>{
    const userId = req.user.id;
    const conversationId = req.body.conversationId;
    try {
        if(!userId){
            return res.status(400).json('Authentication Revoked');
        }

        const conversation = await Conversations.findById(conversationId);
        if(!conversation.users.includes(userId)){
            return res.status(400).json('Invalid request')
        }
        
        const messages = await Messages.find({
            conversationId: conversationId
        })

        if(!messages){
            return res.status(400).json('No messages found');
        }

        res.status(200).json(messages);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;

