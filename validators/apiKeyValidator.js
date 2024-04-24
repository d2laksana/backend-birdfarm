"use strict";

const { body, header } = require("express-validator");
const Users = require("../models/users");
const { response404 } = require("../helpers/response");


const apiKeyValidator = [
    header('x-api-key')
        .isEmpty()
        .withMessage('Api Key tidak boleh kosong')
        .custom(async value => {
            const user = await Users.findOne({ where: { apikey: value } });
            if (!user) throw new Error('Api Key tidak valid')
        }),
    body('temp')
        .isEmpty()
        .withMessage('Temperature tidak boleh kosong'),
    body('hum')
        .isEmpty()
        .withMessage('Humidity tidak boleh kosong')
]