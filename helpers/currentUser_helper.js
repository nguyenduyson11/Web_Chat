var currentUser = null;
class User{
  setCurrentUser(req,res,next){
    currentUser = req.user;
    next();
  }
  getCurrentUser(){
    return currentUser;
  }
}
module.exports = new User;
