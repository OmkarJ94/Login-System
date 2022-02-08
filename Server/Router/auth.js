const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require("../conn/conn")
const otp = require('../schema/Otp')
const User = require('../schema/userSchema')
const authenticate = require('../middleware/authenticate')
const bcrypt = require("bcryptjs");
router.post('/signup', async (req, res) => {


    const { name, email, dob, age, phone, gender, password, cpassword } = req.body;
    try {


        if (!name || !email || !phone || !gender || !password || !gender || !cpassword || !age) {
            return res.status(404).json({ message: "Enter All fields" })
        }
        else {
            const result = await User.findOne({ email: email })


            if (result === null) {
                if (password != cpassword) {
                    return res.status(422).json({ error: "Enter Valid Data" })
                }
                else {

                    const newUser = new User({ name, email, dob, age, phone, gender, password, cpassword })


                    const finalResult = await newUser.save();
                    res.status(201).json({ message: `${name} your registration completed successfully` })
                }
            }
            else {
                return res.status(422).json({ error: "Email already exists" })
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.post("/login", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" })
        }
        const result = await User.findOne({ email: email })


        if (result != null) {

            const isMatch = await bcrypt.compare(password, result.password)

            token = await result.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,

            });



            if (isMatch) {
                res.status(200).json({ message: "Log in successfully" })
            }
            else {


                res.status(400).json({ message: "Invalid Creadentials" })
            }
        }
        else {


            res.status(400).json({ message: "Invalid Creadentials" })
        }

    } catch (error) {

        res.status(400).json({ message: "Invalid Creadentials" })
    }
})

router.post("/getData", async (req, res) => {
    try {

        const { email } = req.body
        if (!email) {
            return res.send(401).json({ error: "Enter Valid Email" })
        }
        const data = await User.findOne({ email })
        if (!data) {
            return res.send(401).json({ error: "Enter Valid Email" })
        }
        else {
            res.send(data)

        }
    } catch (error) {

    }
})

router.get('/getdata', authenticate, async (req, res) => {

    res.send(req.rootUser)
})
router.get("/logout", async (req, res) => {
    res.clearCookie("jwt", {
        path: "/"
    })
    res.status(200).send("user Logout")
})
router.post("/reset", async (req, res) => {
    try {
        const { email } = req.body;


        if (!email) {


            return res.status(404).json({ error: "User Not Found" })
        }
        const result = await User.findOne({ email: email })


        if (result) {

            const code = Math.floor(Math.random() * 10000 + 1)
            let Code = new otp({
                email,
                Otp: code,
                expireIn: new Date().getTime() + 300 * 1000
            })
            const response = await Code.save()
            mailer(email, code)
            res.status(200).json({ error: "OTP Send Your Mail Id" })
        }
        else {

            res.status(404).json({ error: "User Not Found" })
        }
    } catch (error) {

        res.status(404).json({ error: error.message })
    }
})
router.post("/changepassword", async (req, res) => {
    try {
        let { Otp, email, password } = req.body;


        if (!Otp || !email || !password) {
            res.status(404).json({ error: "Enter All Fields" })
        }
        let data = await otp.findOne({ email, Otp })
    
        if (data) {

            let currTime = new Date().getTime()
            let diff = data.expireIn - currTime

            if (diff < 0) {
                res.status(401).json({ error: "Your OTP Expired" })
            }
            else {
                const user = await User.findOne({ email })
                user.password = password;
                await user.save();
                res.status(200).json({ message: "Your Password has been updated successfully" })
            }
        }
        else {
            res.status(404).json({ error: "Enter a Valid OTP" })
        }


    } catch (error) {

        res.status(404).status("Something Went Wrong")
    }


})
const mailer = (mail, otp) => {
    try {


        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject: 'Email For Forgot Password',
            text: `Your OTP for changing password is ${otp}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {

                console.log(err);
            } else {
                console.log(data)
            }
        })
    } catch (error) {

        console.log(error);
    }
}


module.exports = router