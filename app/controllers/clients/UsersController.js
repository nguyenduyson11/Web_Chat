
const User = require('../../models/user');
const Group = require('../../models/group');
const multer = require('multer');
const bcrypt = require('bcrypt');
const Post = require('../../models/post');
const moment = require('moment');
const Comment = require('../../models/post');
const mongoose = require('mongoose');
const user = require('../../models/user');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+ file.originalname );
  }
})
var upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
      if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
          cb(null, true);  
      }else{
          return cb(new Error('Only image are allowed!'))
      }
  }
}).single("avatar")
//upload photo Image
var upload2 = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
      if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
          cb(null, true);  
      }else{
          return cb(new Error('Only image are allowed!'))
      }
  }
}).single("photoImage")
class UsersController{
  findUser(req,res){
    let query = req.query.q;
    User.find({username:{
      $regex: ".*" + query + ".*",
      $options: "i"
    }},function(err,data){
      let rs = data.filter(function(user){
        if(user.admin || user._id.toString() == req.user._id.toString())
          return false;
        return true;  
      })
      Group.find({title:{
        $regex: ".*" + query + ".*",
        $options: "i"
      }},function(err,data){
        res.json({
          status:'oke',
          users: rs,
          groups:data
        })
      })
      
    })
  }
  async profileGroup(req,res){
    let key = req.query.key;
    let iduser = req.user._id
    let currentUser = req.user;
    let listGroups =  await Group.find({$or : [
      {author : req.user._id},
      {members : { $elemMatch : {iduser}}}
    ]})
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileGroup',{
          currentUser,
          userSearch: doc,
          listGroups
        });
      }
    });
     
  }
  async profileFriend(req,res){
    let currentUser = req.user;
    let listUser = await User.find({});
    let listFriends = [];
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        let listId  = doc.friends;
        for(let i = 0;i < listId.length; i++){
          for(let j = 0; j < listUser.length; j++){
              if(listId[i].toString() == listUser[j]._id.toString())
                listFriends.push(listUser[j])
          }
        }
        console.log(listFriends.length);
        res.render('clients/profiles/profileFriends',{
          currentUser,
          userSearch: doc,
          listFriends
        });
      }
    });
  }
  profileInfo(req,res){
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileInfo',{
          currentUser,
          userSearch: doc
        });
      }
    });
  }
  async profileImage(req,res){
    let posts = await Post.find({author: mongoose.Types.ObjectId(req.params.id)}); 
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileImages',{
          currentUser,
          userSearch: doc,
          posts
        });
      }
    });
  }
  async profilePost(req,res){
    let currentUser = req.user;
    let userInfo
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        userInfo = doc
      }
    });
    let message = req.flash('message')
    let posts = await Post.find(
      {author : mongoose.Types.ObjectId(req.params.id)}
    ).sort({createdAt: -1}).lean();
    let users = await User.find({}).lean();
    let comments = await Comment.find({}).lean();
   posts = posts.map(function(post){
      post.dateCreate = moment(post.createdAt).format('DD/MM/YYYY');
      var user
      for(let u of users ){
        if(u._id.toString() == post.author.toString()){
              user = u;
        }
      }
      post.comments = arrayComment(post.comment,comments,users);
      post.username = user.username
      post.userImage = user.image
      return post
   })
    res.render('clients/profiles/profilePost',{
      currentUser,
      posts,
      userSearch: userInfo,
      message
    });
  }
  setting(req,res){
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/settings',{
          currentUser,
          userSearch: doc
        });
      }
    });
  }
  // request friends
  requestFriend(req,res){
    User.findById(req.params.id,function(err,data){
      if(err){
        res.json({
          status:'err',
          message:'kh??ng t??m th???y user'
        })
      }
      else{
        let idRequest = mongoose.Types.ObjectId();
        User.findOneAndUpdate({_id:data._id},{$push: {
          requests: {
            _id: idRequest,
            fromTo:req.user._id,
            username: req.user.username,
            avatar: req.user.image,
            status:'uncheck'
          }
        }},function(err,userRequest){
          if(err){
            res.json({
              status:'err',
              message:'g???i y??u c???u th???t b???i'
            })
          }
          else{
            User.findOneAndUpdate({_id: req.user._id},{$push: {
              requests: {
                _id: idRequest,
                fromTo:req.user._id,
                username: req.user.username,
                avatar: req.user.image,
                status:'uncheck'
              }
            }},function(err,data){
              if(err){
                res.json({
                  status:'err',
                  message:'g???i y??u c???u th???t b???i',
                })
              }
              else{    
                  res.json({
                      userSearch: userRequest,
                      status:'oke',
                      message:'th??m b???n th??nh c??ng',
                  })
              }
            })
          }
        })
      }
    })
  }
  cancelFriend(req,res){
    User.findById(req.params.id,function(err,data){
      if(err){
        res.json({
          status:'err',
          message:'kh??ng t??m th???y user'
        })
      }
      else{
        User.findOneAndUpdate({_id:data._id},{$pull: {
          requests: {
            fromTo:req.user._id
          }
        }},function(err,userRequest){
          if(err){
            res.json({
              status:'err',
              message:'g???i y??u c???u th???t b???i'
            })
          }
          else{
            User.findOneAndUpdate({_id: req.user._id},{$pull: {
              requests: {
                fromTo:req.user._id,
              }
            }},function(err,data){
              if(err){
                res.json({
                  status:'err',
                  message:'g???i y??u c???u th???t b???i',
                })
              }
              else{
                res.json({
                  userSearch: userRequest,
                  status:'oke',
                  message:'h???y l???i m???i k???t b???n th??nh c??ng',
              })
              }
            })
          }
        })
      }
    })
  }
  async getListNotifycation(req,res){
    let results = await User.find({_id: req.user.friends})
    results = results.reduce(function(result,data){
       return result.concat(data.notifications)
    },[])
    results.sort((a,b)=>{
      return b.createAt - a.createAt;
    })
    res.json(results)
  }
  async notifycation(req,res){
    let results = await User.find({_id: req.user.friends}).lean()
    results = results.reduce(function(result,data){
       return result.concat(data.notifications)
    },[])
    results.sort((a,b)=>{
      return b.createAt - a.createAt;
    })
   
    
    results = results.map(function(data){
      let date = new Date(data.createAt);
      data.createAt = `${date.getDate()}-${date.getMonth() -1}-${date.getFullYear()}`
      return data
    })
    res.render('clients/notifycation',{
      user: req.user,
      listNotifycations : results
    })
  }
  editImage(req,res){
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({
          status: 'no',
          err: 'Kh??ng th??? t???i ???????c file'
        })
        return;
      } else if (err) {
        res.json({
          status: 'no',
          err: err
        })
        return;
      }
      User.findOneAndUpdate({_id : req.user._id},{
        image: `/upload/${req.file.filename}`
      },function(err,data){
        if(err){
          res.json({
            status:'error'
          })
        }
        else{
          let post = new Post({
            author: req.user._id,
            content: '',
            images : [req.file.filename],
            comment:[],
            likes:[],
            hearts:[]
          })
          post.save()
          .then(post=>{
            User.findOneAndUpdate({
              _id: req.user._id
            },{
              $push:{
                notifications : {
                  username: req.user.username,
                  avatar: req.user.image,
                  status: 'uncheck',
                  type_id : post._id,
                  type:'user',
                  content: `???? c???p nh???t ???nh ?????i di???n c???a m??nh`,
                  createAt : Date.now()
                }
              }
            }).then(data=>{
              res.json(data);
            })
          })
          .catch(err=>{
            res.json('c???p nh???t th???t b???i')
          })
        }
      })
      
    })
  }
  editPhotoImage(req,res){
    upload2(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({
          status: 'no',
          err: 'Kh??ng th??? t???i ???????c file'
        })
        return;
      } else if (err) {
        res.json({
          status: 'no',
          err: err
        })
        return;
      }
      User.findOneAndUpdate({_id : req.user._id},{
        coverImage: `/upload/${req.file.filename}`
      },function(err,data){
        if(err){
          res.json({
            status:'error'
          })
        }
        else{
          let post = new Post({
            author: req.user._id,
            content: '',
            images : [req.file.filename],
            comment:[],
            likes:[],
            hearts:[]
          })
          post.save()
          .then(post=>{
            User.findOneAndUpdate({
              _id: req.user._id
            },{
              $push:{
                notifications : {
                  username: req.user.username,
                  avatar: req.user.image,
                  status:'uncheck',
                  type_id : post._id,
                  type:'user',
                  content: `???? c???p nh???t ???nh ???nh b??a c???a m??nh`,
                  createAt : Date.now()
                }
              }
            }).then(data=>{
              res.json(data);
            })
          })
          .catch(err=>{
            res.json('c???p nh???t th???t b???i')
          })
        }
      })
      
    })
  }
  editProfile(req,res){
    User.findOneAndUpdate({_id : req.user._id},{
      other : req.body
    })
    .then(data=>{
      User.findById(data._id,function(err,data){
        if(err){
          res.json({
            status:'error',
          })
        }
        res.json({
          status:'oke',
          data
        })
      })
      
    })
    .catch(err=>{
      res.json(err)
    })
  }
  editUser(req,res){
    User.findOneAndUpdate({_id : req.user._id},{
      username: req.body.username,
      phone: req.body.phone,
      city: req.body.city,
      male: req.body.male
    },function(err,data){
      if(err){
        res.json({status:'err'})
      }
      User.findById(data._id,function(err,data){
        if(err){
          res.json({status:'error'})
        }
        res.json({
          status:'oke',
          data
        })
      })
    })
  }
  async editPassword(req,res){
    if(req.body.newPassword !== req.body.confirmPassword)
      return res.json({
        status: 'error',
        message: 'M???t kh???u kh??ng kh???p'
      })
    const validate_pasword = await bcrypt.compare(req.body.currentPassword,req.user.password);
    if(validate_pasword){
      const salt = await bcrypt.genSalt(10); 
      const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
      User.findOneAndUpdate({_id : req.user._id},{
        password : hashPassword
      },function(err,data){
        if(err){
          res.json({
            status:'error',
            message: 'C???p nh???t m???t kh???u kh??ng th??nh c??ng'
          })
        }
        else{
          res.json({status:'oke'})
        }
      })
    }
    else{
      res.json({
        status:'error',
        message: 'M???t kh???u hi???n t???i kh??ng ????ng'
      })
    }
  }
  async requestAccept(req,res){
    console.log(req.params.id)
    const userRequest = await User.findById(req.params.idUser);
   if(userRequest){
    User.findOneAndUpdate({_id : req.user._id},{
      $push : {
        friends: userRequest._id
      }
    },function(err,data){
      if(err){
        res.json({status:'error'})
      }
      else{
        User.findOneAndUpdate({_id : req.params.idUser},{
          $push : {
            friends: data._id
          }
        },function(err,data){
          if(err){
            res.json({status:'error'})
          }
          else{
            User.findOneAndUpdate({_id: req.user._id},{$pull: {
              requests: {
                fromTo:userRequest._id,
              }
            }},function(err,data){
              if(err){
                res.json({
                  status:'err',
                  message:'g???i y??u c???u th???t b???i',
                })
              }
              else{
                User.findOneAndUpdate({_id: userRequest._id},{$pull: {
                  requests: {
                    fromTo:userRequest._id,
                  }
                }},function(err,data){
                  if(err){
                    res.json({
                      status:'err',
                      message:'g???i y??u c???u th???t b???i',
                    })
                  }
                  else{
                    User.findById(req.user.id,function(err,data){
                      if(err){
                        res.json({status:'err'})
                      }
                      else{
                        res.json({
                          user: data,
                          status:'oke',
                        })
                        let isExist = req.user.messages.findIndex(e=>e.toUser.toString() == req.params.idUser.toString());
                        if(isExist != -1)
                          return;
                        User.findOneAndUpdate({_id :req.params.idUser},{
                          $push : { messages : {toUser: mongoose.Types.ObjectId(req.user._id) , inbox:[], block:false}}
                        },function(err,data){
                          if(err){
                            return;
                          }
                          User.findOneAndUpdate({_id :req.user._id},{
                            $push: {messages: {toUser: mongoose.Types.ObjectId(req.params.idUser) , inbox:[], block:false}}
                          },function(err,data){
                            if(err){
                              return;
                            }
                            return;
                          })
                        })
                      }
                    })
                   
                  }
                })
              }
            })
          }
        })
      }
    })
   }
   else{
     res.json({status:'error'})
   }
  }
  destroyFriend(req,res){
    console.log(req.user._id,req.params.id)
    User.findOneAndUpdate({_id: req.user._id},{
      $pull: {
        friends:mongoose.Types.ObjectId(req.params.id)
      }
    },function(err,data){
      if(err){
        res.json({status:'error'})
      }
      else{
        User.findOneAndUpdate({_id: req.params.id},{
          $pull: {
            friends:data._id
          }
        },function(err,data){
          if(err){
            res.json({status:'error'})
          }
          else{
            res.json({status:'oke',user:data})
          }
        })
      }
    })
  }
  blockUser(req,res){
    User.findOneAndUpdate({_id:req.user._id},{
      $push:{
        blocklist: mongoose.Types.ObjectId(req.params.id)
      }
    },function(err,data){
      if(err){
        res.json({status:'error'})
      }
      else{
        res.json({status:'oke',id_user: req.params.id})
      }
    })
  }
  unBlockUser(req,res){
    User.findOneAndUpdate({_id:req.user._id},{
      $pull:{
        blocklist: mongoose.Types.ObjectId(req.params.id)
      }
    },function(err,data){
      if(err){
        res.json({status:'error'})
      }
      else{
        res.json({status:'oke',id_user: req.params.id})
      }
    })
  }
  async sortFriend(req,res){
    let type ={};
    switch (req.query.key) {
      case '1': type = {username : 1}  
        break;
      case '2': type = {username : -1}
        break;
      case '3': type = {createdAt :-1}
        break;
      case '4': type = {createdAt :1}   
      default:
        break;
    }
    let listUser = await User.find({}).sort( type );
    let listFriends = [];
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        let listId  = doc.friends;
        for(let i = 0;i < listUser.length; i++){
          for(let j = 0; j < listId.length; j++){
              if(listId[j].toString() == listUser[i]._id.toString())
                listFriends.push(listUser[i])
          }
        }
        res.json({status:'oke',listFriends})
      }
    });
  }
  getFriend(req,res){
    User.findById(req.params.id,function(err,data){
      if(err){
        res.json({status:'error'})
      }
      else{
        var inbox = null;
        let me = req.user;
        if(me.messages){
          var index = me.messages.findIndex(friend=>friend.toUser.toString() == req.params.id.toString())
          inbox = me.messages[index].inbox
        }
        res.json({status:'oke',userSelect:data,inbox})
      }
    })
  }
  async getListFriends(req,res){
    let results = await User.find({_id: req.user.friends})
    res.json(results)
  }
  async getRequest(req,res){
    let users = await User.find({}).lean();
    let listRequest = req.user.requests.reduce(function(kq,data){
      if(data.fromTo.toString() !=  req.user._id.toString())
        return kq.concat(data);
    },[])
    let kq = []
    users.forEach(function(data){
      let index = listRequest.findIndex(e=>e.fromTo.toString() == data._id.toString())
      if(index != -1){
        data.idRequest = listRequest[index]._id
        return kq.push(data)
      }
    })
    listRequest = kq;
    console.log(listRequest)
    res.render('clients/requestFriends',{
      user: req.user,
      listRequest,
      users
    })
  }
  videocCall(req,res){
    User.findById(req.params.id,function(err,data){
      if(err){
        return res.redirect('/')
      }
      res.render('clients/callVideo',{
        user: data
      })
    })
  }
}
function arrayComment(array,listcomment,users) {
  let result =[]
  for(let i=0;i<array.length;i++)
    for(let j=0;j<listcomment.length;j++){
      if(array[i].toString() == listcomment[j]._id.toString()){
        listcomment[j].ofUser = getUser(listcomment[j].author,users)
        result.push(listcomment[j]);
      }
    }
    result =  result.map(function(data){
      data.child = []
      let list = data.subComment;
      for(let i=0;i<list.length;i++)
        for(let j=0;j<listcomment.length;j++){
          if(list[i].toString() == listcomment[j]._id.toString()){
            listcomment[j].ofUser = getUser(listcomment[j].author,users)
            data.child.push(listcomment[j]);
          }
        }
      return data
    })  
  return result  
}
function getUser(id,users){
  
  let rs = users.find(function(user){
   return user._id.toString() == id.toString();
  })
  
  return {
    user_id: rs._id,
    username : rs.username,
    image : rs.image
  }
}

module.exports = new UsersController;