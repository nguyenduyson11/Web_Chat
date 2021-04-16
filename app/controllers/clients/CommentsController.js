
const Post = require('../../models/post');
const Comment = require('../../models/comment');
const User = require('../../models/user');
class CommentsController{
  async create(req,res){
    let data = {
      author:req.user._id,
      content: req.body.content
    }
    let comment = new Comment(data);
    if(comment.save()){
      let post = await Post.findOneAndUpdate(
      {_id:req.params.id},
      { $push: { comment: comment._id } }
    );
      if(post){
        let countPost = await Post.findById(post._id)
        // req.flash('message','bạn đã bình luận bài viết ');
        // res.redirect('/')
        res.json({
          status:'oke',
          messgae:'bình luận thành công',
          comment,
          post,
          user : req.user,
          countPost: countPost.comment.length
        })
      }
      else{
        // req.flash('message','bài viết đã bị xóa ');
        // res.redirect('/')
        res.json({
          status:'err',
          message:'bài viết đã bị xóa hoặc không tồn tại',
          comment
        })
      }
    }
    
  }
  async index(req,res){
    let post  = await Post.findById(req.params.id);
    if(post){
      
    }
  }
  async destroy(req,res){
   let post_id = req.params.id_post.toString().trim();
    let post = await Post.findById(post_id);
    let comment = await Comment.findById(req.params.id_comment);
    if(post){
      if(req.body.rule == 'parent'){
        Comment.remove({_id: req.params.id_comment},function(err,doc){
          if(err){
            res.json({
              status:'err',
              message:'xóa bình luận thất bại'
            })
          }
          else{
            Post.findOneAndUpdate({_id:post._id},{$pull:{comment: req.params.id_comment}})
            .then(data=>{
              res.json({
                status:'err',
                message:'xóa bình luận thành công',
                result:comment._id,
                post: data
              })
            })
            .catch(err=>{
              res.json({
                status:'err',
                message:'xóa bình luận thất bại'
              })
            })
          }
        })
      }
      else{
        let subc = await Comment.findById(req.body.rule);
        Comment.remove({_id: req.body.rule},function(err,doc){
          if(err){
            res.json({
              status:'err',
              message:'xóa bình luận thất bại'
            })
          }
          else{
            console.log('idcomment',comment._id)
            console.log('idsubcomment',subc._id)
            Comment.findOneAndUpdate({_id:comment._id},{$pull:{subComment: subc._id}})
            .then(data=>{
              console.log(data)
              res.json({
                status:'oke',
                message:'xóa bình luận thành công',
                result:subc._id,
                commentParent: data,
                post
              })
            })
            .catch(err=>{
              res.json({
                status:'err',
                message:'xóa bình luận thất bại'
              })
            })
          }
        })
      }
     } 
  }
  async createSubComment(req,res){
    let data = {
      author:req.user._id,
      content: req.body.content
    }
    let post = await Post.findById(req.params.id);
      if(post){
        let subcomment = new Comment(data);
        if(subcomment.save()){
          var comment = await Comment.findOneAndUpdate(
          {_id:req.body.comment_id},
          { $push: { subComment: subcomment._id } }
        );
        let countsubcomment = await Comment.findById(comment._id)
        if(countsubcomment){
          res.json({
            status:'oke',
            messgae:'bình luận thành công',
            comment,
            post,
            subcomment,
            user : req.user,
            countsubcomment: countsubcomment.subComment.length
          })
        }
        else{
          res.json({
            status:'oke',
            messgae:'bình luận đã bị xóa ',
          })
        }
      }
      else{
        res.json({
          status:'err',
          message:'bài viết đã bị xóa hoặc không tồn tại',
          comment
        })
      }
  }
  }
  async heartsComment(req,res){
    let comment = await Comment.findById(req.params.id);
    if(!comment){
      res.json({
        status:'err',
        message:'không tồn tại bình luận'
      })
      return;
    }
    let array_hearts = comment.hearts;
    let isExist = array_hearts.findIndex(function(data){
      return data.toString() == req.user._id.toString()
    })
    console.log(isExist);
    if(isExist != -1 ){
      let data = await Comment.findOneAndUpdate({_id: comment._id},{
        $pull:{ hearts: req.user._id}
      })
      if(data){
        res.json({
          commentId:data._id,
          countHeart: data.hearts.length -1,
          status:'oke',
          message:'xóa thả tim thành công'
        });
      }
    }
    else{
      let data = await Comment.findOneAndUpdate({_id: comment._id},{
        $push:{ hearts: req.user._id}
      });
      if(data){
        res.json({
          commentId:data._id,
          countHeart: data.hearts.length +1,
          status:'oke',
          message:'thả tim thành công'
        });
      }
    }
  }
}
module.exports = new CommentsController;