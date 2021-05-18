const express = require('express');
const messagesController = require('../app/controllers/clients/messagesController');
const homeController = require('../app/controllers/clients/HomesControllers');
const commentController = require('../app/controllers/clients/CommentsController');
const overrideMethod = require('../app/middlewares/overrideMethod');
const listFriend = require('../app/middlewares/listFriends');
const postController = require('../app/controllers/clients/PostsController');
const userController = require('../app/controllers/clients/UsersController');
const router = express.Router();
router.get('/getuser',(req,res)=>{
  if(req.user){
    res.json({status:'oke',user:req.user})
  }

})
router.use(overrideMethod);
router.get('/messages', messagesController.index);
router.post('/posts/new', homeController.createPost);
router.post('/posts/edit', homeController.updatePost);
router.post('/posts/:id/comment/new', commentController.create);
router.post('/posts/:id/reports/new', homeController.reportPost);
router.delete('/posts/:id/destroy', homeController.deletePost);
router.patch('/posts/:id/heart/edit', homeController.heartPost);
router.get('/posts/:id/comments', commentController.index);
router.delete('/posts/:id_post/comments/:id_comment/destroy', commentController.destroy);
router.post('/posts/:id/subcomment/new',commentController.createSubComment);
router.patch('/comments/:id/heart/edit',commentController.heartsComment);
router.get('/posts/:id',postController.getPost);
router.patch('/posts/:id/edit',postController.edit);
router.get('/searchFriend',userController.findUser);

//profile

router.get('/profile/:id/friends',userController.profileFriend);
router.get('/profile/:id/info',userController.profileInfo);
router.get('/profile/:id/group',userController.profileGroup);
router.get('/profile/:id/images',userController.profileImage);
router.get('/profile/:id',userController.profilePost);
router.get('/profile/:id/setting',userController.setting);
router.post('/user/uploadImage',userController.editImage);
router.post('/user/uploadPhotoImage',userController.editPhotoImage);
//friend
router.post('/requestFriends/:id/add',userController.requestFriend);
router.patch('/requestFriends/:id/accept/:idUser',userController.requestAccept);
router.delete('/requestFriends/:id/remove',userController.cancelFriend);
router.delete('/friends/:id/destroy',userController.destroyFriend);
router.post('/friends/:id/block',userController.blockUser);
router.patch('/friends/:id/unblock',userController.unBlockUser);
router.get('/friends/:id/sort',userController.sortFriend);
router.get("/friends/:id",userController.getFriend);
router.get('/getListFriends',userController.getListFriends)
router.get('/requestFriends',userController.getRequest)
//settting
router.post('/profile/settingInfo',userController.editProfile);
router.post('/profile/settingUser',userController.editUser);
router.post('/profile/settingPassword',userController.editPassword);
//chat
router.get('/requestMessage',messagesController.getMessage);
router.post('/sendMessage/:id',messagesController.create);

//notifycation
router.get('/getListNotifycations',userController.getListNotifycation);
router.get('/notifycations',userController.notifycation)
module.exports = router;