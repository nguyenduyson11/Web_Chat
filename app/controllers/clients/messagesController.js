
class MessagesController{
  index(req,res){
    res.render('clients/chat');
  }
}
module.exports = new MessagesController;