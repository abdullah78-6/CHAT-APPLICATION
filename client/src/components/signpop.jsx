import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register, Signin } from "../redux/chunk.js";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import {ThreeDots} from "react-loader-spinner"
import { ToastContainer, toast } from 'react-toastify';
import { control } from "../redux/chatslice.js";

function Loginpop() {
    const [state,setstate]=useState("LOGIN");
    const [login,setlogin]=useState(false);
    const [showpass,setshowpass]=useState(false);
    const signin=useSelector(state=>state.main.signin);
    const loginstatus=useSelector(state=>state.main.loginstatus);
    const thefinal=useSelector(state=>state.main.thefinal);
    const [loading,setloading]=useState(false);
    let email=useRef();
    let name=useRef();
    let password=useRef();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
      if(loginstatus.length>0){
        const lastmessage=loginstatus[loginstatus.length-1].message;
        toast(lastmessage);
      }
    },[loginstatus]);
    useEffect(()=>{
      if(signin){
            setloading(true);
        setTimeout(()=>{
          setloading(false);
         
          navigate("/pr");

        },4000);
      }


},[signin]);
    function Login(e){
        e.preventDefault();
        dispatch(Signin({email:email.current.value,password:password.current.value}));

    }
    function Signup(e){
        e.preventDefault();
        dispatch(Register({name:name.current.value,email:email.current.value,password:password.current.value}));
        

    }
    function finalstaus(){
        toast("NOW YOU CAN LEAVE THIS WEBSITE ")


    }

      return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center">
      <h1 className="mt-10 text-4xl font-bold tracking-wide">CHAT APPLICATION</h1>
      <p className="mt-4 text-xl text-gray-300">Sign in to continue</p>
<ToastContainer/>
      <button
        className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-xl font-semibold transition"
        onClick={() => setlogin(true)}
      >
        SIGN IN
      </button>
      {signin?<button  className="mt-8 px-8 py-3 bg-red-600 hover:bg-purple-700 rounded-full text-xl font-semibold transition" onClick={finalstaus}>LOG-OUT</button>:<></>}

      {login && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-[90%] max-w-md bg-slate-800 rounded-2xl p-6 shadow-xl">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{state}</h2>
              <button
                className="text-red-500 text-2xl hover:scale-110 transition"
                onClick={() => setlogin(false)}
              >
                ✕
              </button>
            </div>


            <form className="space-y-4">
              {state === "SIGN-UP" && (
                <input
                  ref={name}
                  type="text"
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              <input
                ref={email}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="relative">
                <input
                  ref={password}
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span
                  className="absolute right-4 top-3 text-xl cursor-pointer text-gray-300"
                  onClick={() => setshowpass(!showpass)}
                >
                  {showpass ? <FaEye className="text-purple-600" /> : <FaEyeSlash className="text-purple-600" />}
                </span>
              </div>


              {state === "LOGIN" ? (
                <button
                  onClick={Login}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition"
                >
                  SIGN IN
                </button>
              ) : (
                <button
                  onClick={Signup}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition"
                >
                  SIGN UP
                </button>
              )}
              {loading?<ThreeDots color="cyan" />:<></>}
            </form>


            <div className="mt-6 text-center text-sm text-gray-300">
              {state === "LOGIN" ? (
                <>
                  Don’t have an account?
                  <span
                    className="ml-2 text-purple-400 cursor-pointer hover:underline"
                    onClick={() => setstate("SIGN-UP")}
                  >
                    Create one
                  </span>
                </>
              ) : (
                <>
                  Already have an account?
                  <span
                    className="ml-2 text-purple-400 cursor-pointer hover:underline"
                    onClick={() => setstate("LOGIN")}
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
    </div>
    </div>
  );
    

}
export default Loginpop;