const express = require("express");
const router = express.Router();
const Image=require('../models/images')

router.post("/", async (req, res) => {
    try{
        const result=await Image.updateOne(
            {username:req.body.username},
            {$pull:{image:req.body.image}}
        )
        res.status(200).json(result)
    }
    catch{
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;
