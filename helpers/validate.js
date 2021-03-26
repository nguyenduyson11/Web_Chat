const {check, validationResult} = require('express-validator');


exports.userValidator = [
  check('username').exists().withMessage('Vui lòng nhập user name')
  .notEmpty().withMessage('Tên không được trống')
  .isLength({min: 3}).withMessage('Tên có ít nhất 3 ký tự')
  .isLength({max: 30}).withMessage('Tên có tối đa 3 ký tự'),
  check('gender').exists().withMessage('Vui lòng chọn giới tính của bạn')
  .notEmpty().withMessage('Giới tính  không được trống')
  .isIn(['male','female','other']).withMessage('Giới tính không hợp lệ'),
  check('birthday')
  .custom((value)=>{
    let currentday = new Date();
    let enterday = new Date(value);
    return (enterday.getFullYear() <= currentday.getFullYear() -18)
  }).withMessage('Ngày sinh chưa đủ 18 tuổi'),
  check('email') .notEmpty().withMessage('Email không được trống')
  .isEmail().withMessage('Email không hợp lệ'),
  check('password')
  .notEmpty().withMessage('Mật khẩu không được trống')
  .isLength({min: 6}).withMessage('Mật khẩu có ít nhất 6 ký tự'),
  check('password_confirm')
  .custom((value,{req})=>{
    return (req.body.password === req.body.password_confirm)
  }).withMessage('Mật khẩu không khớp')
  ]
