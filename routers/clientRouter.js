const express = require('express');
const messagesController = require('../app/controllers/clients/messagesController');
const router = express.Router();

router.get('/messages', messagesController.index)
module.exports = router;