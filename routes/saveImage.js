const express = require("express");
const router = express.Router();
const Image=require('../models/images')

router.post("/", async (req, res) => {
    try{
        const imageData=await Image.find({username:req.body.username})
        if (imageData.length===0){
            const newImg=await Image.create({
                username:req.body.username,
                image:req.body.image    
            })
            res.status(200).json({message:"Image saved"})
            return
        }
        else{
            const updatedImg=await Image.updateOne({username:req.body.username},{$push:{image:req.body.image}})
            res.status(200).json({message:"Image updated"})
            return
        }
        
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;