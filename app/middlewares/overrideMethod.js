
module.exports = (req,res,next)=>{
  if ( req.query._method == 'PATCH' ) {
    req.method = 'PATCH';
    req.url = req.path;
  }
  else if ( req.query._method == 'DELETE' ) {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next(); 
}
