 
 const User = require('../../models/user')
class MessagesController{
  async index(req,res){
    let listUser = await User.find({});
    let listId = req.user.friends;
    let listFriends =  listId.map(function(data){
      let isExist = listUser.find(e=>e._id.toString() == data.toString())
      if(isExist){
        return isExist;
      }
    })
    
    res.render('clients/chat',{
      listFriends,
      user:req.user
    });
  }
}
module.exports = new MessagesController;