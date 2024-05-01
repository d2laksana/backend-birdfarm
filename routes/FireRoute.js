"use strict";

const express = require('express');
const router = express.Router();
const FireController = require('../controllers/FireController');
const fireValidator = require('../validators/fireValidator');
const showFireValidator = require('../validators/showFireValidator');

router.get('/relay', showFireValidator, FireController.getRelay);
router.post('/relay', fireValidator, FireController.storeRelay);
router.get('/servo', showFireValidator, FireController.getServo);
router.post('/servo', fireValidator, FireController.storeServo);

module.exports = router;