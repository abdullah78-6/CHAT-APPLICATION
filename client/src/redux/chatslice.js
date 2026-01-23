import {createSlice} from "@reduxjs/toolkit"
const messageslice=createSlice({
    name:"chatapp",
    initialState:{message:"",response:[],profilename:"",profileimage:"images.jpg",friendname:"",friendmessage:"",friendresponse:[],loginstatus:"boolean value",},
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
        loginstatus(state,action){
            state.loginstatus=action.payload;
        }
    }

})
export const control=messageslice.actions;
export default messageslice.reducer;
