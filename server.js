const currentUser = require('../Web_chat/helpers/currentUser_helper');
const User = require('../Web_chat/app/models/user');
const Message = require('../Web_chat/app/models/message');
const userOnlines = [];
const userCalls = [];
function server(io){
   io.on('connection',function(socket){
     let user = currentUser.getCurrentUser();
     let idUser =  user ? user.id : '';
     console.log('co người kết nối'+socket.id);
     if(idUser){
      // let isExist 
      userOnlines[idUser] = socket.id;
     }
     console.log(userOnlines);
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
     socket.on('new-notify-comment',function(res){
       let listFriends = res.user.friends
       listFriends.forEach(function(data){
         socket.to(userOnlines[data]).emit('new-notifcation-comment',res)
       })
     })
     socket.on('new-notify-subcomment',function(res){
       console.log(res)
      let listFriends = res.user.friends
      listFriends.forEach(function(data){
        socket.to(userOnlines[data]).emit('new-notifcation-subcomment',res)
      })
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
    // request friends
    socket.on("add-friend",function(data){
      User.findById(data.userId,function(err,userTo){
        if(err){
          console.log('loi')
          return;
        }
        User.findById(data.userRequest.id,function(err,userFrom){
          if(err){
            console.log('loi')
            return;
          }
          let request_id = userTo.requests.find(e=>e.fromTo.toString() == userFrom._id.toString())._id;
          console.log(request_id)
          socket.broadcast.emit('notifycation-friend',{userTo,userFrom,request_id})
        })
        
      })
        
     
     

    })
    //listen chat message socket
    socket.on('sendMessage',function(data){
      socket.to(userOnlines[data.receiver._id]).emit('messageReceived',data.messageObj)
    })
    //listen keyborad
    socket.on('keyboard',function(data){
      socket.to(userOnlines[data]).emit('keyboardReceived')
    })
    //listen status user
    socket.on('statusUser',function(data){
      let isExist = false;
      for(let x in userOnlines){
        if(x.toString() == data.toString()){
          isExist = true;
        }
      }
      socket.emit('statusUser',isExist)
    })
    //listen event get listUser
    socket.on('getlistUserOnline',function(data){
      let results = [];
      for(let x in userOnlines){
        results.push(x)
      }
      socket.emit('userOnline',results)
    })
    //notifycation inbox
    socket.on('message-Notifycation',function(data){
      socket.to(userOnlines[data.receiver._id]).emit('message-Notifycation',data)
    })

    //group
    socket.on('send-request-add-group',function(request){
      socket.to(userOnlines[request.authorGroup]).emit('send-notifycation-add-group',request)
    })
    socket.on('disconnect',function(socket){
      
    })
    //video call
    socket.on('call-video',function(data){
      socket.to(userOnlines[data.receiver]).emit('receiver-video',data)
    })
    socket.on('connected-peer',function(data){
      console.log(data.sender)
      userCalls[data.sender] = data.peerId;
      console.log(userCalls)
    })
    socket.on('send-peerID',function(data){
      console.log('gửi tới',userOnlines[data])
      socket.emit('get-peerID',userCalls[data])
    })
    socket.on('remove-call',function(data){
      socket.to(userOnlines[data]).emit('removed-call',userCalls[data])
    })
   });

}

module.exports =  server;
