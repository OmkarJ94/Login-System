const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        },
        required: true

    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender:
    {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],

})
userSchema.methods.generateAuthToken = async function () {


    try {

        let userToken = jwt.sign(
            { _id: this._id }
            , process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({ token: userToken });
        await this.save()
        return userToken;
    } catch (error) {
     
        res.send(error);
    }
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});
const user = mongoose.model('User', userSchema)

module.exports = user