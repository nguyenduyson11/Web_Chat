const User = require('../../models/user');
const bcrypt = require('bcrypt');
class UsersController{
  async index(req,res){
    let users =  res.paginationResults.results;
    users = users.filter((a)=>{
      return a.admin == false
    })
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
  profile(req,res){
    let warning = req.flash('warning');
    res.render('admin/viewProfile',{
      user:req.user,
      warning
    });
  }
  async updateProfile(req,res){
    const salt = await bcrypt.genSalt(10); 
    var hashPassword = await bcrypt.hash(req.body.password, salt);
    User.findOneAndUpdate({_id: req.user._id},{
      phone:(req.body.phoneNumber != '') ? req.body.phoneNumber : req.user.phone,
      username: (req.body.username != '') ? req.body.username : req.user.username,
      password: (req.body.password != '') ? hashPassword : req.user.password
    })
    .then(user=>{
      req.flash('warning','cập nhật  thành công');
      res.redirect('/admin/profile');
    })
    .catch(err=>{
      req.flash('warning','cập nhật không thành công');
      res.redirect('/admin/profile');
    })
  }
  async getListUser(req,res){
    let countAccounts = await User.find({})
    let countDeleted = await User.find({deleted: true})
    res.json({
      countAccounts : countAccounts.length,
      countDeleted: countDeleted.length
    })
  }
}
module.exports = new UsersController;