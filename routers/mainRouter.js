const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController')
const registerController = require('../app/controllers/registerController')
router.get('/login', loginController.index);
router.get('/register',registerController.index)

module.exports = router;
