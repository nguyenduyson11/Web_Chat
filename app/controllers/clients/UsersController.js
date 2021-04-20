
const User = require('../../models/user');
class UsersController{
  findUser(req,res){
    let query = req.query.q;
    User.find({username:{
      $regex: ".*" + query + ".*",
      $options: "i"
    }},function(err,data){
      res.json({
        status:'oke',
        users: data
      })
    })
  }
}
module.exports = new UsersController;