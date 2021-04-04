
class HomesController{
  index(req,res){
    res.render('admin/index')
  }
}

module.exports = new HomesController;