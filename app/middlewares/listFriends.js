

const User = require('../models/user');
module.exports =  function(req,res,next){
  let  arrFriends = req.user.friends.map(async function(data){
    let user = await User.findById(data)
    return user;
  })
  
  next();
}