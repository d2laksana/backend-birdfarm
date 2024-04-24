"use strict";

const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const genApiKey = require("../helpers/genApi");
const Users = require("../models/users");
const { response500, response404 } = require("../helpers/response");



async function store(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.array().map(e => e.msg)
            });
        };

        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            apikey: genApiKey()
        };
        console.log(typeof (hashedPass));
        const newUser = await Users.create(data, (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    code: 400,
                    message: err.message
                });
            }

            return res.status(201).json({
                success: true,
                code: 201,
                message: 'Berhasil menambahkan user',
                data: user
            });
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

async function show(req, res) {
    try {
        const user = await Users.findAll({
            attributes: ['id', 'name', 'role', 'apikey']
        });

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Berhasil mengambil data',
            data: user
        });

    } catch (err) {
        return response500(res);
    }
}

async function detail(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) return response404(res, 'User tidak ditemukan');

        return res.json({
            success: true,
            code: 200,
            message: 'Data user berhasil didapatkan',
            data: user
        });
    } catch (err) {
        return response404(err);
    }
}

async function update(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) return response404(res, 'User tidak ditemukan');

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        await user.save();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Data berhasil di update',
            data: user
        })

    } catch (err) {
        return response500(res, err.message)
    }
}

async function destroy(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) return response404(res, 'User tidak ditemukan');

        await user.destroy();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Data berhasil dihapus'
        });
    } catch (err) {
        return response500(res, err.message);
    }
}

module.exports = {
    store,
    show,
    detail,
    update,
    destroy
}