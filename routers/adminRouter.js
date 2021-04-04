const express = require('express');
const homesController = require('../app/controllers/admin/HomesController');
const router = express.Router();

router.get('/dashboard',homesController.index) 
module.exports = router;