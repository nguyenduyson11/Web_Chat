const multer = require('multer');
const moment = require('moment');
const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');
const Report = require('../../models/report');
const flash = require('express-flash');
const { findById } = require('../../models/user');
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
}).array("file_image_edit",4)
class PostsController{
  async getPost(req,res){
    let id_post = req.params.id;
    let message = req.flash('message')
    let posts = await Post.find({$or:[
      {"_id":id_post}
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
    res.render('clients/post',{
      posts,
      user: req.user,
      message
    });
  }
  async edit(req,res){
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
      const arrfile = req.files;
      const images =  arrfile.map((image)=>{
              return image.filename;
      });
      if(arrfile.length > 0){
        Post.findOneAndUpdate({_id: req.params.id},{
          content:req.body.content,
          images: images
        })
        .then(data=>{
          res.redirect('/');
        })
        .catch(err=>{
          res.redirect('/');
        })
      }
      else{
        Post.findOneAndUpdate({_id: req.params.id},{
          content:req.body.content,
        })
        .then(data=>{
          res.redirect('/');
        })
        .catch(err=>{
          res.redirect('/');
        })
      }
    })
  }
  async getPostEdit(req,res){
    let id_post = req.params.id;
    let post = await Post.findById(id_post)
    if(post){
      res.json({status:'oke',post})
    }
    else{
      res.json({status:'error'})
    }
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
module.exports = new PostsController;
