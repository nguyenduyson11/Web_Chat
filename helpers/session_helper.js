const User = require('../app/models/user');

module.exports = async (req,res,next)=>{
  user = await User.findById(req.signedCookies.userid);
  if(!user){
    next();
  }
  else{
    res.redirect('/');
  }
}
