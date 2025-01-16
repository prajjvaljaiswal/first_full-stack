const express = require("express")

const User = require("../models/user")
const {UserAuth} = require("../middlewares/userAuth")

const profileRouter = express.Router() 

profileRouter.get('/profile', UserAuth, async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token)
            throw new Error("Invlaid token")
        // console.log(token)
        const _id = await User.verifyJWT(token)
        const user = await User.findById(_id)
        if (!user)
            throw new Error("User not found")
        res.send(user)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
});

profileRouter.patch("/user/update", UserAuth, async (req, res) => {
    // const name = req.body.firstname
    const id = req.body.id
    try {
        // const user = await User.find({firstname: name})
        await User.findByIdAndUpdate(id, req.body.update)
        res.send("update sucessfull")
    } catch (err) {
        console.error("update failed: " + err)
        res.status(400).send("update failed: " + err)
    }
});

profileRouter.delete("/user/delete", UserAuth, (req, res) => {
    try { } catch (err) { }
});

module.exports = profileRouter