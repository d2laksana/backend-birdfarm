"use strict";


const express = require('express');
const createUserValidator = require('../validators/createUserValidator');
const UsersController = require('../controllers/UsersController');
const router = express.Router();


router.post('/', createUserValidator, UsersController.store);
router.get('/', UsersController.show);
router.get('/:id', UsersController.detail);



module.exports = router;