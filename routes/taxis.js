const express = require('express');
const router = express.Router();
const taxisController = require('../controllers/taxisController');

router.get('/taxis', taxisController.listAllTaxis);

module.exports = router;
