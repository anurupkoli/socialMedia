require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Posts = require('../models/UserPosts');
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchUser = require('../middlewares/fetchUser')

const router = express.Router()

router.post('/uploadPost', fetchUser, async(req,res)=>{
    
})

module.exports = router;