import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { control } from "../redux/chatslice.js";
import { socket } from "../redux/socket.js";

function Friendchat(){
    const friendnames=useSelector(state=>state.main.friendname);
    const friendresponse=useSelector(state=>state.main.friendresponse);
    const reply=useSelector(state=>state.main.response);
    const[frstatus,setfrstatus]=useState(false);
    const frname=useRef();
    let msg2=useRef();
    const dispatch=useDispatch();
    useEffect(()=>{
        socket.emit("joinRoom",{roomId:"user1-user2"});
        const handler=(data)=>{
            if(data.sender===friendnames){
            dispatch(control.replydata2(data));
            }
            else{
                dispatch(control.replydata(data));
            }
        };
        socket.on("receivemessage",handler);
        return ()=>socket.off("receivemessage",handler);
        

    },[]);
    function sendfriendchat(){
        dispatch(control.textdata2(msg2.current.value));
        socket.emit("sendmessage",{
            roomId:"user1-user2",
            message:msg2.current.value,
            sender:friendnames



        })

}
function setfriendname(){
    dispatch(control.frname(frname.current.value));

}
function deletefriendname(){
    dispatch(control.deletefriendname());

}

   return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4">
      
      <div className="w-full max-w-xl bg-slate-800 rounded-2xl p-4 shadow-lg">
        <h1 className="text-xl font-bold mb-3 text-center">FRIEND PROFILE</h1>

        <div className="flex justify-center mb-3">
          <button
            onClick={() => setfrstatus(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
          >
            CHANGE FRIEND NAME
          </button>
        </div>

        {frstatus && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-2xl w-80 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">Change Friend Name</h2>
                <button
                  onClick={() => setfrstatus(false)}
                  className="text-red-500 text-xl"
                >
                  ✕
                </button>
              </div>

              <label className="text-sm text-gray-300">
                CHANGE FRIEND NAME IN CHAT APP
              </label>

              <input
                type="text"
                placeholder="friend name"
                ref={frname}
                className="w-full px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none"
              />

              <button
                onClick={setfriendname}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold"
              >
                ADD
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          {!friendnames ? (
            <h1 className="font-semibold">FRIEND NAME: SAM</h1>
          ) : (
            <h1 className="font-semibold">FRIEND NAME: {friendnames}</h1>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <img
            src="friendimage.jpg"
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>

        <div className="flex justify-center mt-3">
          {friendnames && (
            <button
              onClick={deletefriendname}
              className="text-red-400 text-sm hover:underline"
            >
              DELETE FRIEND NAME
            </button>
          )}
        </div>
      </div>

      
      <div className="w-full max-w-xl mt-6 bg-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="h-[400px] overflow-y-auto space-y-3 px-2">
          {reply.map((i, index) => (
            <div key={index} className="flex justify-start">
              <div className="bg-slate-700 px-4 py-2 rounded-2xl max-w-xs">
                <h1 className="text-sm">{i.message}</h1>
              </div>
            </div>
          ))}

          {friendresponse.map((i, index) => (
            <div key={index} className="flex justify-end">
              <div className="bg-green-600 px-4 py-2 rounded-2xl max-w-xs">
                <h1 className="text-sm text-right">{i.message}</h1>
              </div>
            </div>
          ))}
        </div>

      
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="please enter your message"
            ref={msg2}
            className="flex-1 px-4 py-2 rounded-full bg-slate-700 focus:outline-none"
          />

          <button
            onClick={sendfriendchat}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
    

}
export default Friendchat;
