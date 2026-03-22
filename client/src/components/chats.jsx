import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { control } from "../redux/chatslice.js";
import { pushmessage} from "../redux/chunk.js";
import {io} from "socket.io-client";
import { socket } from "../redux/socket.js";
import { Link, useNavigate } from "react-router-dom";
import Loginpop from "./signpop.jsx";
import { toast, ToastContainer } from "react-toastify";

function Chat(){
    const text=useRef();
    const result=useSelector(state=>state.main.message);
    const prname=useSelector(state=>state.main.profilename);
    const primage=useSelector(state=>state.main.profileimage);
    const reply=useSelector(state=>state.main.response);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const friendresponse=useSelector(state=>state.main.friendresponse);
    const [token,setoken]=useState(false);
    let[msg,setmsg]=useState("PROFILE DELETED SUCESSFULLY");
    useEffect(()=>{
        socket.emit("joinRoom",{roomId:"user1-user2"});
        const handler=(data)=>{
            if(data.sender===prname){
            dispatch(control.replydata(data));
            }
            else{
                dispatch(control.replydata2(data));
            }
        };
        socket.on("receivemessage",handler);
        return ()=>socket.off("receivemessage",handler);
    },[]);
   
    useEffect(()=>{
      const tok=localStorage.getItem("token");
      setoken(tok);

    },[]);
    function Submitchat(){
      dispatch(control.textdata(text.current.value));
    const message=text.current.value;

        dispatch(control.getdata());
        dispatch(pushmessage({message:text.current.value}));
        socket.emit("sendmessage",{
            roomId:"user1-user2",
            message,
            sender:prname,
            
        });
        
       
      
        
    }
    function deleteprofilename(){
        dispatch(control.deleteprofile());
        toast(msg);
    }
    function newprofile(){
        navigate("/pr");
    }
    const logout=()=>{
      if(token){

      dispatch(control.deleteprofile());
      localStorage.removeItem("token");
      setoken(null);
      toast.error("USER LOGOUT");
      }

    }
    
     return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      <ToastContainer/>
      <header className="bg-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold">Chat Application</h1>

        <div className="flex items-center gap-4">
          {primage && (
            <img
              src={primage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
          )}
          <div>
          
          </div>
          
          <span className="font-semibold">{prname || "Guest"}</span>
        </div>
      </header>

      
      <div className="flex flex-1 overflow-hidden">
      
        <aside className="w-72 bg-slate-800 p-4 hidden md:flex flex-col gap-4 border-r border-slate-700">
          <h2 className="text-lg font-semibold">Profile</h2>

          <div className="flex flex-col items-center gap-3">
            <img
              src={primage}
              alt="profile"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <p className="font-bold">USER-NAME:  {prname}</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {prname && (
              <button
                onClick={deleteprofilename}
                className="bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
              >
                Delete Profile
              </button>
            )}
            <button
              onClick={newprofile}
              className="bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition"
            >
              New Profile
            </button>
            {token?
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
            >
              Logout
            </button>
            :<></>}
{token?
            <Link
              to="/fr"
              target="_blank"
              className="text-center bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
            >
              Friend Chat
            </Link>:<p className="text-lg text-center text-red-500 capitalize ">login  to see your friend chat </p>}
          </div>
        </aside>

      
        <main className="flex-1 flex flex-col bg-slate-900">
      
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700">
            <img
              src="friendimage.jpg"
              alt="friend"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="font-semibold text-lg">Your Friend</h2>
          </div>

      
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {friendresponse.map((i, index) => (
              <div key={index} className="flex justify-start">
                <div className="bg-slate-700 px-4 py-2 rounded-2xl max-w-xs">
                  <p className="text-sm">{i.message}</p>
                </div>
              </div>
            ))}

            {reply.map((i, index) => (
              <div key={index} className="flex justify-end">
                <div className="bg-green-600 px-4 py-2 rounded-2xl max-w-xs">
                  <p className="text-sm text-right">{i.message}</p>
                </div>
              </div>
            ))}
          </div>

      
          <div className="px-4 py-3 bg-slate-800 border-t border-slate-700 flex gap-3">
            <input
              ref={text}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={Submitchat}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full font-semibold transition"
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );

}
export default Chat;