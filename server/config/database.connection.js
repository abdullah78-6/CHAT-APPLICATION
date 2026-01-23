const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const uri=process.env.mongodburi;
const connect=async()=>{
    try{
        await mongoose.connect(uri);
        console.log("db connected sucessfully");
    }
    catch(err){
        console.log("error is occur",err);

    }
}
module.exports=connect;