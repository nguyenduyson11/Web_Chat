const User = require('../app/models/user');
const jwt = require('jsonwebtoken');
module.exports = async (req,res,next)=>{
  let token = req.params.token;
  jwt.verify(token,process.env.SECRET_ACTIVED,(err,decoded)=>{
    if(err){
        req.flash('warning','Xác thực không thành công')
        res.redirect('/forgot')
        return;
    };
    req.userId = decoded.user_id;
    next();
})
}
