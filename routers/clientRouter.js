const express = require('express');
const messagesController = require('../app/controllers/clients/messagesController');
const homeController = require('../app/controllers/clients/HomesControllers');
const commentController = require('../app/controllers/clients/CommentsController');
const overrideMethod = require('../app/middlewares/overrideMethod');
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
module.exports = router;