"use strict";

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');
const loginValidator = require('../validators/loginValidator');
const createUserValidator = require('../validators/createUserValidator');


router.post('/login', loginValidator, AuthController.login);
router.post('/register', createUserValidator, UsersController.store);


module.exports = router;