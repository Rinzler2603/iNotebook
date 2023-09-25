const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body,validationResult } = require('express-validator');


router.post('/',[
    body('name','enter a vlaid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }).then(user=>res.json(user)).catch(err=>{console.log(err),res.json({error:"Email already in use",msg:err.message})});
})

module.exports = router