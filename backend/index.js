const mongoServer = require("./db");
const express = require("express");
var cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

mongoServer();
const app = express();
const port = 8000;

app.use(cors())
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));
app.use('/images/uploadedProfilePic', express.static(path.join(__dirname, 'images/uploadedProfilePic')));
app.use('/images/uploadedBackgroundPic', express.static(path.join(__dirname, 'images/uploadedBackgroundPic')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(port, ()=>{
    console.log("Connected at 8000 Port")
})
