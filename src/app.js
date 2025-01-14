const express = require("express")
const { connectDb } = require("./configs/database.js")
const jwt = require("jsonwebtoken")
const app = express()
const User = require("./models/user.js")
const cookieParser = require("cookie-parser")
const { UserAuth } = require("./middlewares/userAuth.js")

app.use(cookieParser())
app.use(express.json())

app.get("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password)
        res.send("Enter email and password")
    try {
        const user = await User.findOne({ email: email })
        console.log(user)
        const token = jwt.sign({ _id: user._id }, "prajjval2004")
        res.cookie("token", token)
        res.send(user)
    } catch (err) {
        console.error("sign in failed: " + err)
    }
});

app.post("/signup", async (req, res) => {
    const user = req.body
    const newUser = new User(user)

    try {

        await newUser.save()
        const token = jwt.sign({ _id: newUser._id }, "prajjval2004")
        res.cookie("token", token)
        res.send("done")
    } catch (err) {
        console.error("error while sign up: " + err)
    }
});

app.get('/profile', UserAuth, async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token)
            throw new Error("Invlaid token")
        const decode = await jwt.verify(token, "prajjval2004");
        const { _id } = decode
        const user = await User.findById(_id)
        if (!user)
            throw new Error("User not found")
        res.send(user)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
});

app.patch("/user", UserAuth, async (req, res) => {
    // const name = req.body.firstname
    const id = req.body.id
    try {
        // const user = await User.find({firstname: name})
        await User.findByIdAndUpdate(id, req.body.update)
        res.send("update sucessfull")
    } catch (err) {
        console.error("update failed: " + err)
    }
});

app.delete("/user", UserAuth, (req, res) => {
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