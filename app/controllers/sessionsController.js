var jwt = require('jsonwebtoken');
const send_mail = require('../mailler/actived_mailler');
const User = require('../models/user');
class SessionsController{
    new(req,res){
        let warning = req.flash('warning');
        res.render('login',{warning});
    }
    create(req,res){
        res.send('trang chủ');
    }
    edit(req,res){
        let warning = req.flash('warning');
        res.render('forgotPassword',{warning});
    }
    async update(req,res){
        let user = await User.findOne({email: req.body.email});
        if(user){
            var token = jwt.sign({ user_id: user._id }, process.env.SECRET_ACTIVED,{ expiresIn: 5 * 60 });
            req.flash('warning', 'Vui lòng kiểm tra email');
            send_mail(user.email,token,'Nhấn vào đây để reset email','reset');
            res.redirect('/forgot');
            return;
        }
        req.flash('warning','Email chưa được đăng ký');
        res.redirect('/forgot');
    }
    destroy(req,res){

    }
}
module.exports  = new SessionsController;
