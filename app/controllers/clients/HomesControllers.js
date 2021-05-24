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
}).array("fileImage",4)
class HomesController{
  async index(req,res){
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
    res.render('clients/home',{
      posts,
      user: req.user,
      message
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
        User.updateOne({
          _id: req.user._id
        },{
          $push:{
            notifications : {
              username: req.user.username,
              avatar: req.user.image,
              type_id : post._id,
              type:'post',
              status: 'uncheck',
              content: `đã đăng một trạng thái mới`,
              createAt : Date.now()
            }
          }
        }).then(data=>{
          res.redirect('/')
        })
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
      type:'post',
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
  async deletePost(req,res){
    let post = await Post.findById(req.params.id);
    Post.remove({_id: req.params.id},function(err,result){
      if(err){
        res.json({
          status: 'err',
          message: 'Xóa thất bại'
        })
      }
      else{
        Comment.deleteMany({
          _id: {
            $in: post.comment
          }
        },function(err,result){
          if(err){
            console.log(err)
          }
          else{
            console.log('thành công')
          }
        })
        res.json({
          result: req.params.id,
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
          countHeart: data.hearts.length -1,
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
          countHeart: data.hearts.length +1,
          status:'oke',
          message:'thả tim thành công'
        });
        User.findOneAndUpdate({_id: req.user._id},{
          $push: {
            notifications : {
                  username: req.user.username,
                  avatar: req.user.image,
                  status:'uncheck',
                  type_id : post._id,
                  type:'post',
                  content: `đã thả tim bài viết của bạn`,
                  createAt : Date.now()
            }
          }
        },function(err,data){
          if(err){
            return;
          }
        })
      }
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
module.exports = new HomesController;
