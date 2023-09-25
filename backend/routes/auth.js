const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body,validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")


const JWT_SECRET = "goodboyhardik";

const valid = [
    body('name','enter a vlaid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})
]

// ROUTE 1 : Create a User using /register
router.post('/register',valid, async (req,res)=>{
//  If there are errors then return a bad req
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    try{
    //  Check whether email is in use or not 
        let user = await User.findOne({email:req.body.email});
        if(user){ return res.status(400).json({error:"Email is already in use"})}
    
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

    //  Create useer
        user = await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email
        })
    
    //  Sending JWT 

        const data={
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);

        res.json({authToken});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
})





// ROUTE 2 : Creating a login
router.post('/login',[
        body("password","Pass can't be blank").exists()
    ], async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

//  Creating login verification
    const {email,password}=req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Wrong email or password ");
        }

        const pwCompare= bcrypt.compare(password,user.password);
        if(!pwCompare){
            return res.status(400).send("Wrong email or password ");
        }

        const data={
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);

        res.json({authToken});
    } catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }

})

// ROUTE 3 : Fetching User Data 

router.post('/getuser',fetchUser,async (req,res)=>{
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
})

module.exports = router