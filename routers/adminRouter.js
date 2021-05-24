const express = require('express');
const homesController = require('../app/controllers/admin/HomesController');
const postsController = require('../app/controllers/admin/PostsController');
const usersController = require('../app/controllers/admin/UsersController');
const notificationController = require('../app/controllers/admin/NotificationsController');
const overrideMethod = require('../app/middlewares/overrideMethod');
const pagination = require('../app/middlewares/paginationResult');
const User = require('../app/models/user');
const Post = require('../app/models/post');
const Report = require('../app/models/report');
const router = express.Router();
router.use(overrideMethod);
router.get('/dashboard', homesController.index);
router.patch('/users/:id/edit', usersController.update);
router.get('/users',pagination(User), usersController.index);
router.get('/posts', pagination(Post), postsController.index);
router.get('/profile', usersController.profile);
router.post('/profile', usersController.updateProfile);
router.post('/profile', usersController.updateProfile);
router.get('/notification',pagination(Report),notificationController.index);
router.get('/posts/new',postsController.new);
router.post('/posts/new',postsController.create);
router.delete('/posts/:id/delete',postsController.delete);
router.get('/getdata',homesController.getdata)

module.exports = router;