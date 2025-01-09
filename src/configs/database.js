const mongoose = require("mongoose");

connectDb = ()=>{
    try{
        mongoose.connect("mongodb+srv://PRAJJVAL:9967138778@namstenode.m3mzr.mongodb.net/")
        console.log("Database Connection Established!!")
    }catch(err){
        console.error("database connection failed: "+ err)
    }
}

module.exports = {
    connectDb,
}