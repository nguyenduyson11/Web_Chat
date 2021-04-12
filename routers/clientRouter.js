const express = require('express');
const messagesController = require('../app/controllers/clients/messagesController');
const homeController = require('../app/controllers/clients/HomesControllers');
const commentController = require('../app/controllers/clients/CommentsController');
const router = express.Router();

router.get('/messages', messagesController.index);
router.post('/posts/new', homeController.createPost);
router.post('/posts/edit', homeController.updatePost);
router.post('/posts/:id/comment/new', commentController.create);
router.post('/posts/:id/reports/new', homeController.reportPost);
router.delete('/posts/:id/destroy', homeController.deletePost);
router.patch('/posts/:id/heart/edit', homeController.heartPost);
module.exports = router;