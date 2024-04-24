"use strict";

const { body } = require("express-validator");
const Users = require("../models/users");

const loginValidator = [
    body('email')
        .isEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Email tidak valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password harus 8 karakter')
]