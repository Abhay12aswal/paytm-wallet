// backend/routes/index.js
const express = require('express');
const userRouter = require("./user");
const zod= require("zod");
const {User}= require("../db")
const jwt= require("jsonwebtoken");
const {JWT_SECRET}= require('../config');
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

		//Create new account 

    // await Account.create({
    //     userId,
    //     balance: 1 + Math.random() * 10000
    // })


    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin", async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const user= await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        msg: "error while logging in "
    })
})




module.exports = router;