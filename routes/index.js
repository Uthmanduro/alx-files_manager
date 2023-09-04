const express = require('express');
const appController = require('../controllers/AppController');
const userController = require('../controllers/UsersController');

const router = express.Router();

router.get('/status', appController.getStatus);

router.get('/stats', appController.getStats);

router.post('/users', userController.postNew);

module.exports = router;
