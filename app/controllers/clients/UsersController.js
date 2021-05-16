
const User = require('../../models/user');
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
      console.log(rs)
      res.json({
        status:'oke',
        users: rs
      })
    })
  }
  async profileGroup(req,res){
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileGroup',{
          currentUser,
          userSearch: doc
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
  profileImage(req,res){
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileImages',{
          currentUser,
          userSearch: doc
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
      {author : req.params.id}
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
      // console.log(arrayComment(post.comment,comments))
      post.comments = arrayComment(post.comment,comments,users);
      post.username = user.username
      post.userImage = user.image
      return post
   })
    // res.json(posts)
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
          message:'không tìm thấy user'
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
              message:'gửi yêu cầu thất bại'
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
                  message:'gửi yêu cầu thất bại',
                })
              }
              else{    
                  res.json({
                      userSearch: userRequest,
                      status:'oke',
                      message:'thêm bạn thành công',
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
          message:'không tìm thấy user'
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
              message:'gửi yêu cầu thất bại'
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
                  message:'gửi yêu cầu thất bại',
                })
              }
              else{
                res.json({
                  userSearch: userRequest,
                  status:'oke',
                  message:'hủy lời mời kết bạn thành công',
              })
              }
            })
          }
        })
      }
    })
  }
  getListNotifycation(req,res){

  }
  editImage(req,res){
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({
          status: 'no',
          err: 'Không thể tải được file'
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
                  type_id : post._id,
                  type:'user',
                  content: `${req.user.username} đã cập nhật ảnh đại diện của mình`
                }
              }
            }).then(data=>{
              res.json(data);
            })
          })
          .catch(err=>{
            res.json('cập nhật thất bại')
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
          err: 'Không thể tải được file'
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
                  type_id : post._id,
                  type:'user',
                  content: `${req.user.username} đã cập nhật ảnh ảnh bìa của mình`
                }
              }
            }).then(data=>{
              res.json(data);
            })
          })
          .catch(err=>{
            res.json('cập nhật thất bại')
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
        message: 'Mật khẩu không khớp'
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
            message: 'Cập nhật mật khẩu không thành công'
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
        message: 'Mật khẩu hiện tại không đúng'
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
                  message:'gửi yêu cầu thất bại',
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
                      message:'gửi yêu cầu thất bại',
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
                          $push : { messages : {toUser: req.user._id , inbox:[], block:false}}
                        },{messages:{toUser:{}}},function(err,data){
                          if(err){
                            return;
                          }
                          User.findOneAndUpdate({_id :req.user._id},{
                            $push: {messages: {toUser: mongoose.Types.ObjectId(req.params.id) , inbox:[], block:false}}
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