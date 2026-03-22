import {createSlice} from "@reduxjs/toolkit"
import { Register, Signin } from "./chunk";
const messageslice=createSlice({
    name:"chatapp",
    initialState:{message:"",response:[],profilename:"",profileimage:"images.jpg",friendname:"",friendmessage:"",friendresponse:[],loginstatus:[],signin:false,thefinal:""},
    reducers:{
        textdata:(state,action)=>{
            state.message=action.payload;

        },
        imagedata:(state,action)=>{
            state.image=action.payload;

        },
        profilenames:(state,action)=>{
            state.profilename=action.payload;

        },
        profileimages:(state,action)=>{
            state.profileimage=action.payload;


        },
        getdata:(state)=>{
        console.log("your message",state.message);
        console.log("your image url ",state.image);
        console.log("profile part");
        console.log(state.profilename);
        console.log(state.profileimage);
        },
        replydata(state,action){
            state.response.push(action.payload);

        },
        frname(state,action){
            state.friendname=action.payload
        },
        deleteprofile(state){
            state.profilename="";
            state.profileimage="images.jpg";
        },
        textdata2(state,action){
            state.friendmessage=action.payload;
            
        },
         replydata2(state,action){
            state.friendresponse.push(action.payload);

        },
        deletefriendname(state){
            state.friendname="";
        },
        thefinal(state,action){
            state.thefinal=action.payload;
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(Signin.fulfilled,(state,action)=>{
            state.loginstatus.push(action.payload);
            // state.signin=true;
        });
        builder.addCase(Register.fulfilled,(state,action)=>{
            state.loginstatus.push(action.payload);

        })
       
    }

})
export const control=messageslice.actions;
export default messageslice.reducer;
