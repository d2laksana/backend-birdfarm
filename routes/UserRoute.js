"use strict";


const express = require('express');
const createUserValidator = require('../validators/createUserValidator');
const UsersController = require('../controllers/UsersController');
const router = express.Router();



router.get('/', UsersController.show);
router.get('/:id', UsersController.detail);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.destroy);



module.exports = router;