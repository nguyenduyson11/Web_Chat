const currentUser = require('../Web_chat/helpers/currentUser_helper');
function server(io){
   io.on('connection',function(socket){
     let user = currentUser.getCurrentUser();
     socket.userId = user ? user.id : '';
     console.log('co người kết nối'+socket.userId);
   });

}

module.exports =  server;
