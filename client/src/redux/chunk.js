import {createAsyncThunk} from "@reduxjs/toolkit";
import { control } from "./chatslice.js";
export const pushmessage=createAsyncThunk(
    "push/msg",
    async({message})=>{
        const res=await fetch("http://localhost:9000/app/push",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({message:message})

        })
        const result1=await res.json();
        if(result1.status){
            console.log("data push sucessfuly");
            return result1.status//msg after storing in database 
        }
        else{
            console.log("err occur");
        }
    }

)
export const Signin=createAsyncThunk(
    "push/signin",
    async({email,password})=>{
        const res2=await fetch("http://localhost:9000/app/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email:email,password:password})

        })

    }

)



export const Register=createAsyncThunk(
    "push/signup",
    async({name,email,password})=>{
        const res2=await fetch("http://localhost:9000/app/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name:name,email:email,password:password})

        })

    }

)
export const RegisterStatus=createAsyncThunk(
    "get/status",
    async({})=>{
        const res2=await fetch("http://localhost:9000",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
           

        })
        const finaldata=await res2.json();
        if(finaldata.status){
            console.log("login sucessfully");
        }
        else{
            console.log("password is incorrect");
        }

    }

)