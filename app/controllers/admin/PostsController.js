const User = require('../../models/user');
const Post = require('../../models/post');
const moment = require('moment');
class PostsController{
  async index(req,res){
    let users = await User.find({}).lean();
    let posts =  res.paginationResults.results;
    posts = posts.map(function(post){
      let x = post.author.toString();
      users.findIndex(u => {
       if((u._id.toString(),x,u._id.toString() == x)){
        post.username = u.username
       }
      })
      post.dateCreate = moment(post.createdAt).format('DD/MM/YYYY');
      return post;
    })
    let warning = req.flash('warning');
    res.render('admin/viewPost',{
      warning,
      posts
    });
  }
  async new(req,res){
    let warning = req.flash('warning');
    req.flash('warning','Đăng thành công');
    res.render('admin/postNew',{
      warning
    });
    
  }
  async create(req,res){
    console.log(req.body.content)
    let post = new Post({
      author:req.user._id,
      content: req.body.content,
      link: req.body.link ? req.body.link : null
    })
    if(post.save()){
      req.flash('warning','Đăng thành công');
      res.redirect('/admin/posts/new');
    }
    else{
      req.flash('warning','Đăng không thành công');
      res.redirect('/admin/posts/new');
    }
    }
  async delete(req,res){
    let post = await Post.findById(req.params.id);
    if(post){
      Post.remove({_id: req.params.id},function(err,result){
        if(err){
          res.json({
            status: 'err',
            message: 'Xóa thất bại'
          })
        }
        else{
          req.flash('warning','xóa thành công')
          res.redirect('/admin/posts')
        }
      })
    }
    else{
      req.flash('warning','không tìm thấy bài viết')
      res.redirect('/admin/posts')
    }
  }  
}

module.exports = new PostsController;
