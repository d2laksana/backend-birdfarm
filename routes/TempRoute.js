"use strict";

const express = require('express');
const router = express.Router();
const TempController = require('../controllers/TempController');


router.post('/', TempController.store);
router.get('/', TempController.show);


module.exports = router;