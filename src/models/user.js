const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

function valid(val) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(val);
}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 4,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        immutable: true,
        validate: {
            validator: valid,
            message: "`{VALUE}` in not valid email"
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "gender msg `{VALUE}`"
        }
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    try {
        const user = this
        const token = await jwt.sign({ _id: user._id }, "prajjval2004", {
            expiresIn: "7d"
        })
        return token;
    } catch (err) {
        throw new Error("Error: " + err)
    };

}

userSchema.methods.verifyJWT = async function (token) {
    try {
        const decode = await jwt.verify(token, "prajjval2004");
        return decode._id
    } catch (err) {
        throw new Error("Error: " + err)
    };
}

const User = mongoose.model("User", userSchema)
module.exports = User