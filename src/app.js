const express = require("express")
const { connectDb } = require("./configs/database.js")
const app = express()
const User = require("./models/user.js")

app.use(express.json())

app.get("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if(!email || !password)
        res.send("Enter email and password")

    try { 
        const user = await User.find({email: email})
        console.log(user)
        res.send(user)
    } catch (err) { 
        console.error("sign in failed: "+err)
    }
});

app.post("/signup", async (req, res) => {
    const user = req.body
    const newUser = new User(user)
    try { 
        await newUser.save()
        res.send("done")
    } catch (err) { 
        console.error("error while sign up: "+err)
    }
});

app.patch("/user", async (req, res) => {
    // const name = req.body.firstname
    const id = req.body.id
    try { 
        // const user = await User.find({firstname: name})
        await User.findByIdAndUpdate(id,req.body.update)
        res.send("update sucessfull")
    } catch (err) { 
        console.error("update failed: "+err)
    }
});

app.delete("/user", (req, res) => {
    try { } catch (err) { }
});


app.listen(5000, async () => {
    try {
        await connectDb()
        console.log("Server is Online!!")
    }
    catch (err) {
        console.log(err)
    }
});