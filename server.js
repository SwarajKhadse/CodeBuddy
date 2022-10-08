const express = require('express');
const app = express();
const path = require('path')
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);

const io =  new Server(server);

app.use(express.static('build'));
app.use((req,res,next)=>
{
    res.sendFile(path.join(__dirname,'build','index.html'));
})

const ACTIONS = require('./src/Actions')

const userSocketMap={};
function getAllConnectedClients (roomId)
{
   return  Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketId)=>
    {
        
        return {
            socketId,
            username:userSocketMap[socketId],
        }
    });
}

io.on('connection',(socket)=>
{
    // console.log('socket connected' );
    //use when the new user added store its socket id ands username
    console.log('socket connected' , socket.id);
    socket.on(ACTIONS.JOIN,({roomId,username})=>
    {
        userSocketMap[socket.id]=username;

        socket.join(roomId);
        
        const clients = getAllConnectedClients(roomId);
          console.log('clients');
        clients.forEach(({socketId})=>
        {
             io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username: username,
                socketId:socket.id,
             })
        }
        )
    })
          socket.on(ACTIONS.CODE_CHANGE , ({roomId,code})=>
          {
              socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code});
          })
          socket.on(ACTIONS.SYNC_CODE , ({socketId,code})=>
          {
              io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code});
          })
    socket.on('disconnecting',()=>
    {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>
        {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId:socket.id,
                username : userSocketMap[socket.id],
            })
            console.log('sdjfhkjsf');

        }
    )
    delete userSocketMap[socket.id];
    socket.leave();
})
});
// const PORT = process.env.PORT || 5000;

// server.listen(PORT , () =>{
// console.log(`server started on port ${PORT}`)
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// // io = require('http').Server(app);
// var socket = require('socket.io')(io);

// socket.on('connect',function(socket){
//     console.log('got a connection')
// });

// io.listen(3000)