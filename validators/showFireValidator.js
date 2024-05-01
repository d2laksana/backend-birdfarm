"use strict";

const { header } = require("express-validator");
const Users = require("../models/users");


const showFireValidator = [
    header('x-api-key')
        .notEmpty()
        .withMessage('Api key dibutuhkan')
        .custom(async value => {
            const user = await Users.findOne({ where: { apikey: value } });
            if (!user) {
                throw new Error('Api key invalid');
            }
            return true;
        })
];

module.exports = showFireValidator;