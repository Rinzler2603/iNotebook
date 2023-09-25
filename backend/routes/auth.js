const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body,validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "goodboyhardik";

const valid = [
    body('name','enter a vlaid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})
]


router.post('/',valid, async (req,res)=>{
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

module.exports = router