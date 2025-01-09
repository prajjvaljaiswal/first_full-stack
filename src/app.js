const express = require("express")
const {connectDb} = require("./configs/database")
const app = express()

app.get("/signin", (req, res) => {
    try{}catch(err){}
});

app.post("/signup", (req, res) => { 
    try{}catch(err){}
});

app.patch("/user", (req, res) => { 
    try{}catch(err){}
});

app.delete("/user", (req, res) => { 
    try{}catch(err){}
});


app.listen(5000, async() => {
    await connectDb()
    console.log("Server is Online!!")
});