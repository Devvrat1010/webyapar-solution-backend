const express = require("express");
const router = express.Router();
const User=require('../models/users')
const bcrypt=require('bcrypt')
const saltRounds = 10;
const jwt=require('jsonwebtoken')

const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })
}
router.post("/", async (req, res) => {
    try{
        const existingUser=await User.find({username:req.body.username})
        // console.log(existingUser,"existingUser")
        if (existingUser.length!=0){
            if(existingUser.username===req.body.username){
                res.status(400).json({error:"User already exists"})
            }
            else if (existingUser.email===req.body.email){
                res.status(400).json({error:"Email already exists"})
            }
        }
        else{
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            const new_user=await User.create({
                username:req.body.username,
                email:req.body.email,
                password:hash,
            })
            const token=createToken(new_user._id)
            res.status(200).json({message:new_user,token:token})
        }
    }
    catch(err){
        res.status(400).json({ error: err.message})
    }
})

module.exports = router;