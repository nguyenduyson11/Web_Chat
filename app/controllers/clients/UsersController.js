
const User = require('../../models/user');
const multer = require('multer');
const Post = require('../../models/post');
const moment = require('moment');
const Comment = require('../../models/post');
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
  profileFriend(req,res){
    let currentUser = req.user;
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.render('clients/profiles/profileFriends',{
          currentUser,
          userSearch: doc
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
    let posts = await Post.find({$or:[
      {"author":{$in: req.user.friends}},
      {"author":req.user._id}
    ]}).sort({createdAt: -1}).lean();
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
        User.findOneAndUpdate({_id:data._id},{$push: {
          requests: {
            fromTo:req.user._id,
            username: req.user.username,
            avatar: req.user.image
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
                fromTo:req.user._id,
                username: req.user.username,
                avatar: req.user.image
              }
            }},function(err,data){
              if(err){
                res.json({
                  status:'err',
                  message:'gửi yêu cầu thất bại',
                })
              }
              else{
                User.findOneAndUpdate({_id: req.params.id},{$push:{
                  notifications: {
                    content: ` đã gửi cho bạn yêu cầu kết bạn`,
                    fromTo: req.user._id,
                    username: req.user.username,
                    avatar: req.user.image
                  }
                }},function(err,data){
                  res.json({
                      userSearch: userRequest,
                      status:'oke',
                      message:'thêm bạn thành công',
                  })
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