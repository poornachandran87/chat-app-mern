import { Server  } from "socket.io";
import http from 'http';
import express from 'express';


const app = express()

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000"],
        methods: ["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}
const userSocketMap ={}

io.on("connection",(socket) =>{
   

    const userID= socket.handshake.query.userID;
    if(userID != "undefined") userSocketMap[userID] =socket.id

    io.emit("getOnlineUser",Object.keys(userSocketMap))

    socket.on("disconnect",() => {
        
        delete userSocketMap[userID]
        io.emit("getOnlineUser",Object.keys(userSocketMap))

    })
})

export { app,io,server }