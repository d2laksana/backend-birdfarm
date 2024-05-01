"use strict";

const { body, header } = require("express-validator");
const Users = require("../models/users");

const fireValidator = [
    header('x-api-key')
        .notEmpty()
        .withMessage('Api key dibutuhkan')
        .custom(async value => {
            const user = await Users.findOne({ where: { apikey: value } });
            if (!user) {
                throw new Error('Api key invalid');
            }
            return true;
        }),
    body('value')
        .notEmpty()
        .withMessage('Value tidak boleh kosong')
        .isNumeric()
        .withMessage('value harus berupa 0 atau 1')
];

module.exports = fireValidator;