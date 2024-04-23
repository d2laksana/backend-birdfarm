"use strict";

const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { response401 } = require('../helpers/response');
require('dotenv').config()

async function JwtMiddleware(req, res, next) {
    try {
        const token = req.header('Authorization').split('')[1];

        // verif token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // verif user
        const user = await Users.findOne({ where: { id: decode.sub } });


        if (!user) return response401(res);

        next();
    } catch {
        return response401(res);
    }
}

module.exports = JwtMiddleware;