const userschema=require("../models/user.message.schema.js");
const collected=async(req,res)=>{
    try{
    const {message}=req.body;
    console.log(typeof(message),"from fronted user ",message);
    const newuser=new userschema({
        message
    })
    const result=await newuser.save();
    if(result){
        res.status(200).json({message:"user message sucessfully"});
    }
    
    }
    catch(err){
        console.log("colection err",err);
        res.status(400).json({message:"user message not save "});

    }

}
module.exports=collected;