const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
name:String,
email:String,
password:String,
groupId:Number
});

module.exports=userModel=mongoose.model('user',userSchema);