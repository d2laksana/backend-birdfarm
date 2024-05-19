"use strict";

const { validationResult } = require("express-validator");
const { response400, response404, response500 } = require("../helpers/response");
const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return response400(res, error.array().map(e => e.msg));
        }

        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) return response404(res, 'Email tidak terdaftar');

        console.log(user);

        const check = await bcrypt.compare(req.body.password, user.password);
        if (!check) return response400(res, 'Password anda salah');

        const payload = {
            sub: user.id,
            exp: new Date().setDate(new Date().getDate() + 10),
            iat: new Date().getTime()
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: "HS512" });

        user.token = token;
        await user.save();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Login Success',
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                api: user.apiKey,
                token: token
            }
        });


    } catch (err) {
        return response500(res, err.message);
    }
}

module.exports = {
    login
}