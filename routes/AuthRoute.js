"use strict";

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');


router.post('/login', AuthController.login);
router.post('/register', UsersController.store);


module.exports = router;