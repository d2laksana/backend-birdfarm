"use strict";

const { body } = require("express-validator");




const updateUserValidator = [
    body('name')
        .isEmpty()
        .withMessage('Nama tidak boleh kosong')
]