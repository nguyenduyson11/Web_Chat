const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  let token = req.params.token;
  //kiểm tra token có hay không
  if(!token)
        return res.redirect('/login');
  try {
      jwt.verify(token,process.env.SECRET_ACTIVED,(err,decoded)=>{
          if(err){
              res.redirect('/login')
              return;
          };
          req.email = decoded.user_mail;
          next();
      })

  } catch (error) {
      res.status(401).send('lỗi rồi')
  }
}
