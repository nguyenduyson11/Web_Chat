const Post = require('../../models/post')
const User = require('../../models/user');
const Report = require('../../models/report');
const Group = require('../../models/group');
const moment = require('moment');
class HomesController{
  async getdata(req,res){
    let days_ago = new Date();
    days_ago.setDate(days_ago.getDate() -6)
    let groupPosts = await Post.aggregate([
      {
        $match : { "createdAt": { $gte: days_ago } }
      },
      // Second Stage
      {
        $group : {
           _id : { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
           count: { $sum: 1 }
        }
      }
    ])
    let groupUsers = await User.aggregate([
      {
        $match : { "createdAt": { $gte: days_ago } }
      },
      // Second Stage
      {
        $group : {
           _id : { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
           count: { $sum: 1 }
        }
      }
    ]) 
    let groupReports = await User.aggregate([
      {
        $match : { "createdAt": { $gte: days_ago } }
      },
      // Second Stage
      {
        $group : {
           _id : { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
           count: { $sum: 1 }
        }
      }
    ])
    let results =[]
    let currentDate = new Date();
    for(let i =0; i<6;i++){
      currentDate.setDate(currentDate.getDate() -1);
      let date = `${currentDate.getDate()}-0${currentDate.getMonth() +1}-${currentDate.getFullYear()}`
      let isExistPost = groupPosts.findIndex(e=>e._id.toString() == date.toString());
      let isExistUser = groupUsers.findIndex(e=>e._id.toString() == date.toString());
      let isExistReports = groupReports.findIndex(e=>e._id.toString() == date.toString());
      results.push({
        date,
        post: isExistPost != -1 ? groupPosts[isExistPost].count : 0,
        user: isExistUser != -1 ? groupUsers[isExistUser].count : 0,
        report: isExistReports != -1 ? groupReports[isExistReports].count : 0
      })
    }
    //chart 2
    res.json(results)
  }
  async index(req,res){
    let users = await User.find({});
    let results = await Post.find({}).sort({comment: -1}).limit(5).lean();
    let postAdmin = await Post.find({ author: req.user._id}).sort({createdAt : -1}).limit(1);
    let listGroup = await Group.find({}).sort({members: -1}).lean();
    results = results.reduce(function(rs,post){
      let isExist = users.findIndex(u=>u._id.toString() == post.author.toString())
      if(isExist != -1){
        post.ofUser = {
          username: users[isExist].username,
          avatar: users[isExist].image,
          phone: users[isExist].phone,
          datePost : moment(post.createdAt).format('DD/MM/YYYY')
        }
      }
      return rs.concat(post)
    },[])
    res.render('admin/index',{
      results,
      postAdmin,
      listGroup
    })
  }
}

module.exports = new HomesController;