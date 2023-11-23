const express = require("express");
const router = express.Router();
const User=require('../models/users')
const jwt=require('jsonwebtoken')

const maxAge=3*24*60*60

const createToken=(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET ,{
        expiresIn:maxAge
    })
}

router.post("/", async (req, res) => {
    const {email,password}=req.body
    try{
        const user=await User.login(email,password)
        const token = createToken(user._id)
        // console.log(token,"token")
        res.cookie('jwt',token,{httpsOnly:true,maxAge:maxAge*1000})
        .status(200)
        .json({message:user._id,token:token})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

module.exports = router;