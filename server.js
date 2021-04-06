const currentUser = require('../Web_chat/helpers/currentUser_helper');
const User = require('../Web_chat/app/models/user');
const Message = require('../Web_chat/app/models/message');
const userOnlines = [];
function server(io){
   io.on('connection',function(socket){
     let user = currentUser.getCurrentUser();
     socket.userId = user ? user.id : '';
     console.log('co người kết nối'+socket.userId);
     if(userOnlines.indexOf(socket.userId) == -1){
      userOnlines.push(socket.userId);
     }
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
   });
}

module.exports =  server;
