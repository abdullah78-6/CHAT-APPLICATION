const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const https=require("http");
const collectionrouter=require("./routes/message.collection.js");
const authrouter=require("./routes/auth.routes.js");
const{Server}=require("socket.io");
const connectiondb=require("./config/database.connection.js");
const cookieparser=require("cookie-parser");
connectiondb();
const app=express();
app.use(express.json());
app.use(cors({
    origin:"https://chat-application-ubj9.onrender.com",
    credentials:true
}));
app.use(cookieparser());
dotenv.config();
const server=https.createServer(app);//socket.io only run with this server 
app.use("/app",collectionrouter);
app.use("/app",authrouter);
const io=new Server(server,{
    cors:{origin:"*"},
})
io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    socket.on("joinRoom",({roomId})=>{
        socket.join(roomId);
        console.log(`socket ${socket.id} joined room ${roomId}`)

    });
    socket.on("sendmessage",({roomId,message,sender})=>{

        io.to(roomId).emit("receivemessage",{
            message,
            sender
        })
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })

});

server.listen(process.env.port,()=>{
    console.log("server is running");

})
