const jwt=require("jsonwebtoken");
const genratetoken=async(userid)=>{
    try{
        const token=await jwt.sign({userid},process.env.jwtsecret,{expiresIn:"7d"});
        return token
    }
    catch(err){
        console.log(err);

    }

}
module.exports=genratetoken;