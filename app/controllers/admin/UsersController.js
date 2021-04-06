const User = require('../../models/user');
class UsersController{
  async index(req,res){
    let users =  res.paginationResults;
    let warning = req.flash('warning');
    if(users){
      res.render('admin/viewUser',{
        users,
        warning
      });
    }
  }
  async update(req,res){
    let user = await User.findById(req.params.id);
    if(user){
      user.deleted = !user.deleted
      await user.save();
      req.flash('warning', 'cập nhật thành công');
      res.redirect('/admin/users');
    }
    else{
      req.flash('warning', 'Không tìm thấy người dùng');
      res.redirect('/admin/users');
    }
  }
}
module.exports = new UsersController;