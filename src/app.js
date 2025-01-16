const express = require("express")
const { connectDb } = require("./configs/database.js")
const jwt = require("jsonwebtoken")
const app = express()
const User = require("./models/user.js")
const cookieParser = require("cookie-parser")
const { UserAuth } = require("./middlewares/userAuth.js")
const AuthRouter = require("./routes/Auth.js")
const profileRouter = require("./routes/profile.js")

app.use(cookieParser())
app.use(express.json())

app.use(AuthRouter)

app.use(profileRouter)

app.listen(5000, async () => {
    try {
        await connectDb()
        console.log("Server is Online!!")
    }
    catch (err) {
        console.log(err)
    }
});