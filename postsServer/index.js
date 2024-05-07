const mongoServer = require("./db");
const express = require("express");
var cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

mongoServer();
const app = express();
const port = 8003;

app.use(cors())
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/posts', require('./routes/posts'));

app.listen(port, ()=>{
    console.log(`Connected at ${port} Port`)
})
