const express=require("express");
const authrouter=express.Router();
const{Sign,Signup}=require("../controllers/auth.control.js")
authrouter.post("/signin",Sign);
authrouter.post("/signup",Signup);

module.exports=authrouter;