import { io } from "socket.io-client";
export const socket=io("https://chat-application-backend-6w7d.onrender.com",{
   autoConnect:true, 
})
