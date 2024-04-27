"use strict";

const { body, header } = require("express-validator");
const Users = require("../models/users");


const storeSuhuValidator = [
    header('x-api-key')
        .notEmpty()
        .withMessage('Api Key tidak boleh kosong')
        .custom(async value => {
            const user = await Users.findOne({ where: { apikey: value } });
            if (!user) {
                throw new Error('Api Key tidak valid');
            }
            return true;
        }),
    body('temp')
        .notEmpty()
        .withMessage('Temperature tidak boleh kosong'),
    body('hum')
        .notEmpty()
        .withMessage('Humidity tidak boleh kosong')
]

module.exports = storeSuhuValidator;