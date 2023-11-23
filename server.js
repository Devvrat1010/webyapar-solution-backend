require('dotenv').config()

const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const cors=require('cors')
const cookieParser=require('cookie-parser');

const app=express()
mongoose.set('strictQuery',false)

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())


const dbURI=process.env.DB_URI
const PORT = process.env.PORT || 3000


const saveImage = require("./routes/saveImage");
const getImage = require("./routes/getImage");
const saveUser = require("./routes/saveUser");
const loginUser=require('./routes/loginUser')
const checkUser=require('./middleware/checkUser')
const deleteImage=require('./routes/deleteImage')


app.use("/saveImage", saveImage)
app.use("/getImage", getImage)
app.use("/saveUser", saveUser)
app.use("/loginUser", loginUser)
app.use("/checkUser", checkUser)
app.use("/deleteImage", deleteImage)

const start=async()=>{
    try{
        await mongoose.connect(dbURI)
        app.listen(PORT,()=>{
            console.log(`Listening on port ${PORT}`);
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "server side error"})
    }
}




start()




