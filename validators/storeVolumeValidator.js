"use strict";

const { body, header } = require("express-validator");
const Users = require("../models/users");


const storeVolumeValidator = [
    header('x-api-key')
        .notEmpty()
        .withMessage('Api Key tidak boleh kosong')
        .custom(async value => {
            const user = await Users.findOne({ where: { apikey: value } });
            if (!user) throw new Error('Api Key tidak valid');

            return true;
        }),
    body('value')
        .notEmpty()
        .withMessage('value tidak boleh kosong')
        .isNumeric()
        .withMessage('value harus berisi angka')
]

module.exports = storeVolumeValidator;