const express = require('express');
const {userValidator} = require('../helpers/validate');
const {check, validationResult} = require('express-validator');
const authLogin = require('../helpers/authLogin');
const session_helper = require('../helpers/session_helper');
const checkResetToken = require('../helpers/checkReset_helper');
const router = express.Router();
const check_admin = require('../helpers/check_admin');
const check_login = require('../helpers/check_Login');
const verify_token = require('../helpers/activated_helper');
const sessionController = require('../app/controllers/sessionsController');
const userController = require('../app/controllers/UsersController');
const homesController = require('../app/controllers/clients/HomesControllers')
router.get('/login',session_helper, sessionController.new);
router.post('/login', authLogin, sessionController.create);
router.get('/register',userController.new);
router.post('/register',userValidator,userController.create);
router.get('/register/:token',verify_token,userController.update);
router.get('/forgot',sessionController.edit);
router.post('/forgot',sessionController.update);
router.get('/', check_login, homesController.index);
router.get('/reset/:token',checkResetToken, userController.edit);
router.patch('/reset', [check('password_confirm')
.custom((value,{req})=>{
  return (req.body.password === req.body.password_confirm)
}).withMessage('Mật khẩu không khớp')], userController.reset);
router.get('/logout',(req,res)=>{
  res.clearCookie('userid');
  res.redirect('/');
})


module.exports = router;
