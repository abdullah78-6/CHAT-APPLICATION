const express=require("express");
const collection=express.Router();
const collected=require("../controllers/message.controller.js");
collection.post("/push",collected);
module.exports=collection;