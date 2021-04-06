const express = require('express');
const homesController = require('../app/controllers/admin/HomesController');
const usersController = require('../app/controllers/admin/UsersController');
const overrideMethod = require('../app/middlewares/overrideMethod');
const pagination = require('../app/middlewares/paginationResult');
const User = require('../app/models/user');
const router = express.Router();
router.use(overrideMethod);
router.get('/dashboard',homesController.index);
router.patch('/users/:id/edit', usersController.update);
router.get('/users',pagination(User),usersController.index);

module.exports = router;