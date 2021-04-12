
class NotificationsController{
  index(req,res){
    res.render('admin/viewNotification')
  }
}

module.exports = new NotificationsController;