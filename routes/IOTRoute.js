"use strict";

const express = require('express');
const router = express.Router();
const IOTController = require('../controllers/IOTController');
const storeSuhuValidator = require('../validators/storeSuhuValidator');
const storeVolumeValidator = require('../validators/storeVolumeValidator');


router.post('/dht', storeSuhuValidator, IOTController.storeDHT);
router.get('/dht', IOTController.showDHT);
router.post('/volume', storeVolumeValidator, IOTController.storeVolume);
router.get('/volume', IOTController.showVolume);


module.exports = router;