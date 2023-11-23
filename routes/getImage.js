const express = require("express");
const router = express.Router();
const Image=require('../models/images')

router.get("/", async (req, res) => {
    try{
        console.log(req.query.username);
        const result=await Image.find({username:req.query.username})
        res.status(200).json(result)
    }
    catch{
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;
