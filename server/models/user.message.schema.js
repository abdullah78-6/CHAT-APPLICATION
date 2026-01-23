const mongoose=require("mongoose");
const Userschema=new mongoose.Schema({
    message:String
})
module.exports=mongoose.model("user-message",Userschema);