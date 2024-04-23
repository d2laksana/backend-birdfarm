"use strict";

const { body } = require("express-validator");
const Users = require("../models/users");

const createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong')
        .isString()
        .withMessage('Nama harus sebuah String'),
    body('email')
        .notEmpty()
        .withMessage('Email tidak boleh kosong')
        .isEmail()
        .withMessage('Email tidak valid')
        .custom(async value => {
            const user = await Users.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Email sudah terdaftar');
            }
            return true
        }),
    body('password')
        .notEmpty()
        .withMessage('Password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('Password harus memiliki minimal 8 karakter'),
    body('passwordConfirmation')
        .notEmpty()
        .withMessage('Konfirmasi Password tidak boleh kosong')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Konfirmasi password tidak sama dengan password')
            }
            return true
        })
];

module.exports = createUserValidator;