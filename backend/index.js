const mongoServer = require("./db");
const express = require("express");
var cors = require('cors')

mongoServer();
const app = express();
const port = 8000;
app.use(cors())

// These are Routing Paths that are resolved in routes folder
app.use(express.json());
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/note', require('./routes/note'));

app.listen(port, ()=>{
    console.log("Connected at 8000 Port")
})
