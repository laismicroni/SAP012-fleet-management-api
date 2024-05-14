const express = require('express');
const router = express.Router();
const taxisController = require('../controllers/taxisController');

router.get('/taxis', taxisController.listAllTaxis);
router.get('/taxis/:id/locations', taxisController.listTaxiLocationsByDate);
router.get('/taxis/last-locations', taxisController.listLastTaxiLocations);

module.exports = router;
