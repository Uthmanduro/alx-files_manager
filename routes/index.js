const express = require('express');
const appController = require('../controllers/AppController');
const userController = require('../controllers/UsersController');
const authController = require('../controllers/AuthController');
const fileController = require('../controller/FilesController');

const router = express.Router();

router.get('/status', appController.getStatus);

router.get('/stats', appController.getStats);

router.post('/users', userController.postNew);

router.get('/connect', authController.getConnect);

router.get('/disconnect', authController.getDisconnect);

router.get('/users/me', userController.getMe);

router.post('/files', fileController.postUpload);

module.exports = router;
