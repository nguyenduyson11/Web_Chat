const multer = require('multer');
const moment = require('moment');
const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');
const Report = require('../../models/report');
const flash = require('express-flash');
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
    let post = await Post.findById(id_post);
    if(post){
      res.json({
        status:'oke',
        post: post
      })
    }
    else{
      res.json({
        status:'error',
      })
    }
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
}
module.exports = new PostsController;
