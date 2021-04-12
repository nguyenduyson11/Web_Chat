
const Post = require('../../models/post');
const Comment = require('../../models/comment');
class CommentsController{
  async create(req,res){
    let data = {
      author:req.user._id,
      content:req.body.content
    }
    let comment = new Comment(data);
    if(comment.save()){
      let post = await Post.findOneAndUpdate(
      {_id:req.params.id},
      { $push: { comment: comment._id } }
    );
      if(post){
        res.json({
          status:'oke',
          messgae:'bình luận thành công',
          comment
        })
      }
      else{
        res.json({
          status:'err',
          message:'bình luận thất bại',
          comment
        })
      }
    }
    
  }
}
module.exports = new CommentsController;