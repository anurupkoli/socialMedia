require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Posts = require('../models/UserPosts');
const multer = require('multer')
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchUser = require('../middlewares/fetchUser')

const router = express.Router()

const Storage = multer.diskStorage({
    destination: 'images/posts',
    filename: (req, file, cd)=>{
        cd(null, 'posts')
    }
})

router.post('/uploadPost', fetchUser, async(req,res)=>{
    
})

module.exports = router;