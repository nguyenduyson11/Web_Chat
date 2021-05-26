 
 const User = require('../../models/user');
 const Group = require('../../models/group');
 const cloudinary = require('../../../util/cloudinaty')
 const multer = require('multer');
const mongoose  = require('mongoose');
const { TRUE } = require('node-sass');
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
}).single("coverImage")
class GroupsController{
  create(req,res){
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
      let group = new Group({
        author : req.user._id,
        title: req.body.name,
        coverImage :  req.file ? `/upload/${req.file.filename}` : undefined
      });
      if( group.save()){
        res.json({status:'oke',user: req.user})
      }
      else{
        res.json({status:'error'})
      }
    })
  }
  show(req,res){
    Group.findById(req.params.id,function(err,group){
      if(err){
        return res.redirect('/')
      }
      
      let isMember = false;
      group.members.forEach(function(data){
        if(data.toString() == req.user._id.toString()){
          isMember = true;
        }
      })
      let isAuthor = group.author.toString() == req.user._id.toString() ? true : false 
      let isRequest = false;
      console.log(isMember)
      group.requests.forEach(function(data){
        if(data.fromTo.toString() == req.user._id.toString()){
          isRequest = true;
        }
      })
        res.render('clients/group',{
          isMember,
          isAuthor,
          isRequest,
          group
      })
    })
  }
  async sort(req,res){
    let key = req.query.key;
    let params = {title :1};
    switch (key) {
      case '1':
        params = {title :1}
        break
      case '1':
        params = {title :1}
        break;
      case '2':
        params = {title :-1}
        break;
      case '3':
        params = {createdAt :-1}
        break;
      case '4':
        params = {createdAt :1}
        break;
      default:
        break;
    }
    let iduser = req.user._id
    let listGroups =  await Group.find({$or : [
      {author : req.user._id},
      {members : { $elemMatch : {iduser}}}
    ]}).sort(params)
    User.findById(req.params.id,function(err,doc){
      if(err){
        res.redirect('/');
      }
      else{
        res.json({
          listGroups,
          key
        })
      }
    });
  }
  requestGroup(req,res){
    Group.findById(req.params.id,function(err,group){
      if(err){
        return res.redirect('/')
      }
      let idRequest = mongoose.Types.ObjectId()
      Group.findOneAndUpdate({_id : group._id},{
        $push : {
          requests : {
            _id : idRequest,
            fromTo: req.user._id,
            username: req.user.username,
            avatar: req.user.image
          }
        }
      },function(err,data){
        if(err){
          return res.json({status:'error'})
        }
        res.json({status:'oke',request:{
            _id : idRequest,
            fromTo: req.user._id,
            username: req.user.username,
            avatar: req.user.image,
            authorGroup : data.author,
            titleGroup : data.title,
            idGroup : data._id
        }})
      })
    })
  }
  acceptRequest(req,res){
    Group.findOneAndUpdate({_id : req.params.id_group},{
      $pull : {requests : {_id :  mongoose.Types.ObjectId(req.params.id_request)}},
      $push : {members : mongoose.Types.ObjectId(req.params.id_user)}
    },function(err,data){
      if(err){
        return res.json({status:'error'})
      }
      res.json({status:'oke'})
    })
  }
  cancelRequest(req,res){
    Group.findById(req.params.id,function(err,data){
      if(err){
        return res.json({status:'error'})
      }
      Group.findOneAndUpdate({_id : req.params.id},{
        $pull : {requests : {fromTo : req.user._id}},
      },function(err,data){
        if(err){
           res.json({status:'error'})
        }
        res.json({status:'oke',group:data})
      })
    })
  }
  async createPost(req,res){
    try {
      let result
      if(req.file){
        result = await cloudinary.uploader.upload(req.file.path,{
          resource_type: "auto",
        });
      }
      let idPost = mongoose.Types.ObjectId()
      Group.findOneAndUpdate({_id :req.params.id},{
        $push : {
          posts: {
            _id :idPost,
            author: req.user._id,
            nameAuthor: req.user.username,
            avatarAuthor: req.user.image,
            content : req.body.content,
            file: result ? result.secure_url : undefined,
            cloudinary_id : result ? result.public_id : undefined,
            typeFile: result ? result.resource_type : 'text',
            comments :[],
            hearts :[],
            createAt: Date.now()
          }
        }
      },function(err,data){
        if(err){
          return res.json({status: 'error'})
        }
        res.redirect(`/group/${data._id}`)
      })
    } catch (error) {
      console.log('lỗi nè',error)
    }
  }
  async removePost(req,res){
    Group.findOneAndUpdate({_id : req.params.id_group},{
      $pull : {
        posts: {_id: mongoose.Types.ObjectId(req.params.id_post)}
      }
    },function(err,data){
      if(err){
        return res.json({status:'error'})
      }
      let post  = data.posts.find(e=>e._id.toString() == req.params.id_post.toString())
      let otions = post.typeFile == 'image' ? {} : {resource_type: "video"}
      console.log(post.cloudinary_id,otions)
      cloudinary.uploader.destroy(post.cloudinary_id,otions)
      .then(res.json({status:'oke',group:data}))
      .catch()
    })
    
  }
  newComment(req,res){
    try {
      let idC = mongoose.Types.ObjectId()
      Group.findOneAndUpdate({_id : req.params.id_group, "posts._id" : mongoose.Types.ObjectId(req.params.id_post) },{
        $push : {
          'posts.$.comments' : {
            _id :idC,
            author: req.user._id,
            username: req.user.username,
            avatar: req.user.image,
            child: [],
            hearts: [],
            content: req.body.content,
            creatAt: Date.now()
          }
        }
      },function(err,data){
        if(err){
          return res.json({status:'error'})
        }
        res.json({status:'oke',comment:{
          id :idC,
          author: req.user._id,
          post: req.params.id_post,
          username: req.user.username,
          avatar: req.user.image,
          child: [],
          hearts: [],
          content: req.body.content,
          creatAt: Date.now()
        }})
      })
    } catch (error) {
      res.json({status:'error'})
    }
  }
  removeComment(req,res){
    try {
      let idC = mongoose.Types.ObjectId()
      Group.findOneAndUpdate({"posts._id" : mongoose.Types.ObjectId(req.params.id_post) },{
        $pull : {
          'posts.$.comments' : {
            _id : mongoose.Types.ObjectId(req.params.id_comment)
          }
        }
      },function(err,data){
        if(err){
          return res.json({status:'error'})
        }
        res.json({status:'oke',comment:{
          id : req.params.id_comment
        }})
      })
    } catch (error) {
      res.json({status:'error'})
    }
  }
}
module.exports = new GroupsController;