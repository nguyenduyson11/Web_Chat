const { validate_user } = require("../../helpers/validate");
const  send_mail = require('../mailler/actived_mailler');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {check, validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');

class UsersController{
    //trang view đăng ký
    new(req,res){
        let error = req.flash('error');
        res.render('register',{error});
    }
    //tạo tài khoản
    async create(req,res){
        let result = validationResult(req);
        if (result.errors.length >0){
            req.flash('error', result.errors[0].msg);
            res.redirect('/register');
        }
        else{
            const find_email = await User.findOne({email: req.body.email});
            if (find_email){
                req.flash('error', 'Email đã tồn tại');
                res.redirect('/register');
                return;
            }
            //mẫ hóa mật khẩu và tạo một user mới
            const salt = await bcrypt.genSalt(10); 
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const user = await new User({
                username: req.body.username,
                male: req.body.gender,
                date_of_bitrh: req.body.birthday,
                email: req.body.email,
                phone: req.body.phone,
                password: hashPassword
           });
            //lưu user xuống database 
           if (user.save()){
                 var token = jwt.sign({ user_mail: user.email }, process.env.SECRET_ACTIVED);
                 req.session.token_actived = token;
                 req.flash('warning', 'Vui lòng kiểm tra email');
                 send_mail(user.email,token,'Nhấn vào đây để kích hoạt tài khoản','register');
                 res.redirect('/login');
                
           }
           else{
                req.flash('error', 'Đăng ký thất bại');
                res.redirect('/register');
           }
        }
       
    }
    //kích hoạt tài khoản qua mail
    async update(req,res){
        var user = await User.findOne({email: req.email});
        if(user && !user.activated){
            user.activated = true;
            user.save()
            .then(user=>{
                req.flash('warning', 'Kích hoạt tài khoản thành công');
                res.redirect('/login');
            })
            .catch(err=>{
                req.flash('warning', 'Kích hoạt thất bại');
                res.redirect('/login');
            })
        }
        else{
            req.flash('warning', 'tài khoản đã được kích hoạt');
            res.redirect('/login');
        }
    }
    edit(req,res){
        let error = req.flash('error');
        let warning = req.flash('warning');
        res.render('resetPassword',{error,warning,user_id:req.userId,token: req.params.token})
    }
    async reset(req,res){
        let result = validationResult(req);
        if (result.errors.length >0){
            req.flash('error', result.errors[0].msg);
            res.redirect(`/reset/${req.body.token}`);
            return;
        }
        let user = await User.findById(req.body.user_id);
        if(user){
            const salt = await bcrypt.genSalt(10); 
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.updateOne({password: hashPassword})
            .then(data=>{
                req.flash('warning', 'Mật khẩu đã được cập nhật');
                res.redirect('/login');
            })
            .catch(err=>{
                req.flash('error', 'cập nhật không thành công');
                res.redirect(`/reset/${req.body.token}`);
            })
        }
        else{
            req.flash('error', 'Không tìm thấy tài khoản');
            res.redirect(`/reset/${req.body.token}`);
        }
    }
}
module.exports = new UsersController;
