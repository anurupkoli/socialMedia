const mongoServer = require("./db");
const express = require("express");
var cors = require('cors')

mongoServer();
const app = express();
const port = 8000;
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(port, ()=>{
    console.log("Connected at 8000 Port")
})
