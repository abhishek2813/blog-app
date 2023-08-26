const express = require('express');
const routes = require('./routes/users');
const db = require("./config/db")
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 8100;
app.use(express.json())
app.use("/",routes)

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})

