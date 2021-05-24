const Post = require('../../models/post')
const User = require('../../models/user');
const Report = require('../../models/report');
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
    res.json(results)
  }
  async index(req,res){
    res.render('admin/index',{
    })
  }
}

module.exports = new HomesController;