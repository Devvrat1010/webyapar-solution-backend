const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        return ({message:"incorrect password"})
    }
    return ({message:"incorrect email"})
}

module.exports=mongoose.model('User',userSchema)