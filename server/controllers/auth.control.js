const Userauthschema=require("../models/user.auth.schema.js");
const bcryptjs=require("bcryptjs");
const hash=require("bcryptjs");
const genratetoken=require("../utils/tokens.js");

const Signup=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await Userauthschema.findOne({email});
        if(user){
            return res.status(400).json({message:"USER IS ALREADY EXIST"});
        }
        if(password.length<6){
            return res.status(400).json({message:"PASSWORD MUST HAVE ATLEAST 6 CHARACTERS"});
        }
        
        
        const hashedpassword=await bcryptjs.hash(password,10);
        const newuser=await Userauthschema.create({
            name,
            email,
            password:hashedpassword
        })
        const token=await genratetoken(newuser._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            httpOnly:true,


        })
        
        return res.status(201).json({ message: "USER IS REGISTER SUCCESSFULLY" });

    }
    catch(err){
        return res.status().json({message:`SIGNUP ERR ${err}`});

    }
    
}
const Sign=async(req,res)=>{
    const {email,password}=req.body;
    try{
         const user=await Userauthschema.findOne({email});
         if(!user){
            return res.status(400).json({message:"USER DOES NOT EXIST ",status:false});
         }
     const ismatch=await bcryptjs.compare(password,user.password);
         if(!ismatch){
            return res.status(400).json({message:"INCORRECT PASSWORD",status:false});
         }
         
         const token=await genratetoken(user.id);
         res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            httpOnly:true,
         })
         return res.status(200).json({message:"LOGIN SUCESSFULLY",status:true,token});


    }
    catch(err){
        return res.status(500).json({message:`SIGN IN ERROR ${err}`});

    }
}
module.exports={Sign,Signup};
