const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.MONGOURL).then((res)=>{
    console.log("Mongo Db connected");
}).catch((err)=>{
    console.log("Couldn't connect Mongodb",err);
})

