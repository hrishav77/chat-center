const path=require('path');
const http=require('http')
const express=require('express');
const socketio=require('socket.io');
const formatMessage=require('./utils/messages')
const {users,addUser,userLeave}=require('./utils/users');


const app=express();
const server=http.createServer(app);
const io=socketio(server);



app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket=>{
        socket.on("joinroom",(user)=>{
        socket.emit("message",formatMessage("ADMIN","welcome to chat"));
        const newuser=addUser(socket.id,user.username);
        io.emit("userjoin",newuser);
        socket.broadcast.emit("message",formatMessage("ADMIN",`${user.username} has joined the chat`));
        
        socket.on("disconnect",()=>{
           if (user){ const newuser=userLeave(socket.id)
            io.emit("userjoin",newuser);
            io.emit("message",formatMessage("ADMIN",`${user.username} has left the chat`));
           }
        })
        socket.on("chatmsg",msg=>{
            io.emit("message",formatMessage(user.username,msg));
        })
        
    })
    

});

const PORT=process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
