const Sign=async(req,res)=>{
    const {email,password}=req.body;
    console.log("email and password from frontend",email,password);
}
const Signup=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log("regestration details from frontend are",name,email,password);
}
module.exports={Sign,Signup};
