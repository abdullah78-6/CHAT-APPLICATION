import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { control } from "../redux/chatslice.js";
import {useNavigate} from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
function Profile(){
    const dispatch=useDispatch();
    const primage=useSelector(state=>state.main.profileimage);
    const [loading,setloading]=useState(false);
    const setname=useRef();
    const setimagepath=useRef();
    const navigate=useNavigate();
    function Set(){
        dispatch(control.profilenames(setname.current.value));
        const file=setimagepath.current.files[0];
        if(file){
            const imageurl=URL.createObjectURL(file);
            dispatch(control.profileimages(imageurl));
        }
        dispatch(control.getdata());
          setloading(true);
        setTimeout(()=>{
            navigate("/chats");
            setloading(false);
          

        },2000);
        

    }

    return    (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center">
      <h1 className="mt-8 text-4xl font-bold tracking-wide">
        CHAT APPLICATION
      </h1>

      <div className="mt-10 w-[90%] max-w-2xl bg-slate-800 rounded-2xl shadow-lg shadow-blue-500/30 p-8 flex flex-col items-center">
       
        <div className="mb-6">
          <img
            className="w-40 h-40 rounded-full border-4 border-green-500 object-cover"
            src={primage}
            alt="profile-image"
          />
        </div>

       
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
          <label className="text-xl font-semibold capitalize">
            Enter Name
          </label>
          <input
            className="w-full px-4 py-3 text-lg rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="enter name"
            ref={setname}
          />
        </div>

       
        <div className="w-full flex flex-col md:flex-row items-center gap-6 mb-6">
          <label className="text-xl font-semibold capitalize">
            Choose profile image
          </label>

          <input
            ref={setimagepath}
            type="file"
            accept="image/*"
            className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 file:bg-green-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none cursor-pointer"
          />

          {loading && (
            <ThreeDots
              height="60"
              width="60"
              radius="9"
              color="#22c55e"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          )}
        </div>

       
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-xl font-semibold"
          onClick={Set}
        >
          SET PROFILE
        </button>
      </div>
    </div>
  );

}
export default Profile;