const currentUser = require('../Web_chat/helpers/currentUser_helper');
const User = require('../Web_chat/app/models/user');
const Message = require('../Web_chat/app/models/message');
const userOnlines = [];
function server(io){
   io.on('connection',function(socket){
     let user = currentUser.getCurrentUser();
     socket.userId = user ? user.id : '';
     socket.id = user ? user.id : '';
     console.log('co người kết nối'+socket.id);
     if(userOnlines.indexOf(socket.userId) == -1){
      userOnlines.push(socket.userId);
     }
    //  console.log(userOnlines)
     //chat with user
     socket.on('chat',function(data){
      let msg = new Message({
        // $push: {listMessage: {
        //   id_user: data.to_user,
        //   content: data.content
        // }}
        listMessage: [{id_user: data.id_user,content: data.content}]
      });
      console.log(msg.listMessage);
     });
     socket.on('post',function(data){
      console.log('co người đăng bài')
      console.log(data);
     });
     //new comment
     socket.on('new-comment',function(data){
       io.sockets.emit('new-comment',data)
     })
     
     //remove comment
     socket.on('remove-comment',function(data){
      socket.broadcast.emit('remove-comment',data)
     })
     //new subcomment
     socket.on('new-subcomment',function(data){
      io.sockets.emit('new-subcomment',data)
    })
    //remove subcomment
     socket.on('remove-subcomment',function(data){
       io.sockets.emit('remove-subcomment',data)
     })
     socket.on('remove-subcomment_fetch',function(data){
      io.sockets.emit('remove-subcomment_fetch',data)
    })
   });

}

module.exports =  server;
