const multer = require('multer');
const moment = require('moment');
const comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');
const Report = require('../../models/report')
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
}).array("fileImage",8)
class HomesController{
  async index(req,res){
    let posts = await Post.find({$or:[
      {"author":{$in: req.user.friends}},
      {"author":req.user._id}
    ]}).sort({createdAt: -1}).lean();
    let users = await User.find({}).lean();
   posts = posts.map(function(post){
      post.dateCreate = moment(post.createdAt).format('DD/MM/YYYY');
      var user
      for(let u of users ){
        if(u._id.toString() == post.author.toString()){
              user = u;
        }
      }
      post.username = user.username
      post.userImage = user.image
      return post
   })
    res.render('clients/home',{
      posts,
      user: req.user
    });
  }
  createPost(req,res){
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
      let post = new Post({
        author: req.user._id,
        content:req.body.content,
        images : images,
        comment:[],
        likes:[],
        hearts:[]
      })
      post.save()
      .then(post=>{
        res.send('tạo thành công')
      })
      .catch(err=>{
        res.send('tạo thất bại')
      })
    })
  }
  updatePost(req,res){
    
  }
  async reportPost(req,res){
    let report = new Report({
      id_post: req.params.id,
      title: req.body.title,
      content: req.body.content
    })
    let post = await Post.findById(req.params.id);
    if(post){
      if(report.save()){
        res.json({status:'oke',message: 'Bạn đã báo cáo bài viết thành công'});
        return;
      }
      res.json({status:'err',message: 'Báo cáo bài viết thất bại'})
    }
    else{
      res.json({
        status:'err',
        messgae:'bài viết của bạn đã bị xóa hoặc không tồn tại'
      })
    }
    
    
  }
  deletePost(req,res){
    Post.remove({_id: req.params.id},function(err,result){
      if(err){
        res.json({
          status: 'err',
          message: 'Xóa thất bại'
        })
      }
      else{
        res.json({
          status: 'err',
          message: 'Xóa bài đăng thành công'
        })
      }
    })
  }
  async heartPost(req,res){
    let post = await Post.findById(req.params.id);
    let array_hearts = post.hearts;
    let isExist = array_hearts.findIndex(function(data){
      return data.toString() == req.user._id.toString()
    })
    if(!post){
      res.json({status:'err', message:'không tồn tại bài viết'})
    }
    if(isExist>=0){
      let data = await Post.findOneAndUpdate({_id: post._id},{
        $pull:{ hearts: req.user._id}
      })
      if(data){
        res.json({
          status:'oke',
          message:'xóa thả tim thành công'
        });
      }
    }
    else{
      let data = await Post.findOneAndUpdate({_id: post._id},{
        $push:{ hearts: req.user._id}
      });
      if(data){
        res.json({
          status:'oke',
          message:'thả tim thành công'
        });
      }
    }
  }
}
module.exports = new HomesController;
