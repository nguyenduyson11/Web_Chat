const User = require('../app/models/user');
const bcrypt = require('bcrypt');

module.exports = async (req,res,next)=>{
  user = await User.findById(req.signedCookies.userid);
  if(!user){
    req.flash('warning','Vui lòng đăng nhập');
    res.redirect('/login');
    return;
  }
  if (user.admin){
    req.user = user;
    next();
  }
  else{
    res.redirect('/');
  }
}
