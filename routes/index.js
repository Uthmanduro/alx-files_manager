const express = require('express');
const controller = require('../controllers/AppController');

const router = express.Router();

router.get('/status', controller.getStatus);

router.get('/stats', controller.getStats);

module.exports = router;
