const User = require('../app/models/user');
const bcrypt = require('bcrypt');

module.exports = async (req,res,next)=>{
  let user = await User.findOne({email: req.body.email});
  if(!user){
    req.flash('warning', 'Email chưa được đăng ký');
    res.redirect('/login');
    return;
  }
  if(!user.activated){
    req.flash('warning','Tài khoản chưa được kích hoạt');
    res.redirect('/login');
    return;
  }
  const validate_pasword = await bcrypt.compare(req.body.password,user.password);
  if(validate_pasword){
    res.cookie('userid',user._id,{
      signed: true
    });
    req.user = user;
    next();
  }
  else{
    req.flash('warning', 'Tài khoản hay mật khẩu không đúng');
    res.redirect('/login');
  }
}
