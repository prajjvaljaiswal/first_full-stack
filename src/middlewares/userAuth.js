const jwt = require("jsonwebtoken")
const express = require("express")
const User = require("../models/user")



const UserAuth = async (req, res, next) => {
    const {token} = req.cookies
    try {
        if(!token){
            res.status(400).send("No Cookies!")
        }
        const decode = jwt.verify(token,"prajjval2004")
        const id = decode._id
        const user = User.findById(id)
        if(!user){
            res.status(404).send("User not exist")
        }
        next()
    } catch (err) {
        res.status(400).send("Error: "+err)
    }
}

module.exports = {
    UserAuth
}