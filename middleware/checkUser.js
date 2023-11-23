const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const User=require('../models/users')


router.get("/",async (req,res,next)=>{
    const token = req.get('Authorization');
    // console.log(token,"this check token")
    
    if (token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.status(500).json({error:err.message})
            }
            else{
                console.log(decodedToken,"decodedToken")
                const existingUser=await User.find()

                const user=existingUser.filter((user)=>{
                    const curr=JSON.stringify(user._id)
                    const curr2=JSON.stringify(decodedToken.id)
                    return curr===curr2
                    // if(curr===curr2){
                    //     console.log(user,"user")
                    //     res.status(200).json({data:user})
                    //     return 
                    // }
                })
                if (user) {
                    // console.log(user, "user");
                    res.status(200).json({ data: user });
                } else {
                    // console.log("user not found");
                    res.status(500).json({ error: "user not found" });
                }
            }
        })
    }
    else{
        // console.log("token not found")
        res.status(500).json({error:"token not found"})
    }

    
})

module.exports=router 