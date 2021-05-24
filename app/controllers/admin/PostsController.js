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
}

module.exports = new PostsController;
