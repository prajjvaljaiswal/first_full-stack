const express = require("express")
const User = require("../models/user")

const AuthRouter = express.Router()

AuthRouter.get("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password)
        res.send("Enter email and password")
    try {
        const user = await User.findOne({ email: email })
        console.log(user)
        const token = await user.getJWT()
        // console.log(token)
        res.cookie("token", token)
        res.send(user)
    } catch (err) {
        console.error("sign in failed: " + err)
    }
});

AuthRouter.post("/signup", async (req, res) => {
    const user = req.body
    const newUser = new User(user)

    try {

        await newUser.save()
        const token = await newUser.getJWT()
        // console.log(token)
        res.cookie("token", token)
        res.send("done")
    } catch (err) {
        console.error("error while sign up: " + err)
        res.status(400).send("error while sign up: " + err)
    }
});

AuthRouter.post("/logout", (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.send("Loged out!!!")
})

module.exports = AuthRouter