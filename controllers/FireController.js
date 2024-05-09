"use strict";

const { ref, onValue, set, get, child, update } = require("firebase/database");
const { dbFire } = require("../config/firebase");
const { response500, response400, response403 } = require("../helpers/response");
const { validationResult } = require("express-validator");




async function getRelay(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));

        const apikey = req.headers['x-api-key'];

        const relay = ref(dbFire, apikey);
        get(child(relay, '/relay/value')).then((snapshot) => {
            if (!snapshot.exists()) return response400(res, 'Data tidak ditemukan');
            return res.status(200).json({
                success: true,
                code: 200,
                message: 'Berhasil mengambil data relay',
                data: snapshot.val()
            });
        });

    } catch (err) {
        return response500(res, err.message);
    }
}

async function storeRelay(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));
        const apikey = req.headers['x-api-key'];

        await update(ref(dbFire, apikey + '/relay'), {
            value: req.body.value
        });
        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Berhasil menambahkan data',
            data: req.body.value
        });

    } catch (err) {
        return response500(res, err.message)
    }
}

async function getServo(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));

        const apikey = req.headers['x-api-key'];

        const servo = ref(dbFire, apikey);

        get(child(servo, '/serve/value')).then((snapshot) => {
            if (!snapshot.exists()) return response400(res, 'Data tidak ditemukan');
            return res.status(200).json({
                success: true,
                code: 200,
                message: 'Berhasil mengambil data relay',
                data: snapshot.val()
            });
        });

    } catch (err) {
        return response500(res, err.message);
    }
}

async function storeServo(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));

        const apikey = req.headers['x-api-key'];

        // await set(ref(dbFire, apikey + '/servo'), {
        //     value: req.body.value
        // });

        await update(ref(dbFire, apikey + '/servo'), {
            value: req.body.value
        })

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Berhasil menambahkan data',
            data: req.body.value
        });

    } catch (err) {
        return response500(res, err.message)
    }
}

module.exports = {
    getRelay,
    storeRelay,
    getServo,
    storeServo
};