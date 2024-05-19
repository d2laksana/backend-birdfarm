"use strict";

const { validationResult } = require("express-validator");
const Users = require("../models/users");
const { response400, response500, response403, response404 } = require("../helpers/response");
const influxClient = require("../config/influxdb");
const { Point } = require("@influxdata/influxdb-client");
const Volume = require("../models/volume");


async function storeDHT(req, res) {
    try {
        const error = validationResult(req);
        // console.log(req.headers['x-api-key'])
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));

        const storeData = influxClient.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET, 's');
        const point = new Point('suhu')
            .tag('apikey', req.headers["x-api-key"])
            .floatField('temperature', req.body.temp)
            .floatField('humidity', req.body.hum);
        storeData.writePoint(point);

        await storeData.flush();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Data berhasil disimpan',
            data: {
                temp: req.body.temp,
                hum: req.body.hum
            }
        });

    } catch (err) {
        return response500(res, err.message);
    }
}

async function showDHT(req, res) {
    try {
        const apikey = req.headers['x-api-key'];
        if (!apikey) {
            return response403(res);
        }

        const user = await Users.findOne({ where: { apikey: apikey } });
        if (!user) {
            return response400(res, 'ApiKey tidak valid');
        }

        const queryApi = influxClient.getQueryApi(process.env.INFLUX_ORG);
        const fluxQuery = `from(bucket: "${process.env.INFLUX_BUCKET}")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "suhu")
        |> filter(fn: (r) => r["_field"] == "humidity" or r["_field"] == "temperature")
        |> filter(fn: (r) => r["apikey"] == "${apikey}")
        |> sort(columns: ["_time"], desc: true)
        |> group(columns: ["_field"])
        |> limit(n: 1)
        `;
        const results = { humidity: [], temperature: [] };
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                const field = obj._field;
                if (field === 'humidity' || field === 'temperature') {
                    results[field].push(obj);
                }
            },
            error(error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    code: 500,
                    message: error.message
                });
            },
            complete() {
                res.send({
                    success: true,
                    code: 200,
                    message: 'Data fetched successfully',
                    data: result
                });
            }
        });
    } catch (err) {
        return response500(res, err.message);
    }
}

async function storeVolume(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return response400(res, error.array().map(e => e.msg));

        const user = await Users.findOne({ where: { apikey: req.headers['x-api-key'] } });


        // cek data volume dengan id user
        const cekData = await Volume.findOne({ where: { userid: user.id } });
        if (cekData) {
            cekData.userid = user.id
            cekData.value = req.body.value

            await cekData.save();

            return res.status(200).json({
                success: true,
                code: 200,
                message: 'Data berhasil di update',
                data: req.body.value
            });
        }
        const data = {
            userid: user.id,
            value: req.body.value
        };
        const newData = await Volume.create(data)
        if (newData) {
            return res.status(201).json({
                success: true,
                code: 201,
                message: 'Data berhasil disimpan',
                data: data
            });
        };

    } catch (err) {
        return response500(res, err.message);
    }
}

async function showVolume(req, res) {
    try {
        const apikey = req.headers['x-api-key'];
        if (!apikey) return response403(res);

        const user = await Users.findOne({ where: { apikey: apikey } });
        if (!user) return response400(res, 'api key tidak valid');

        const data = await Volume.findAll({ where: { userid: user.id } });
        if (!data) return response404(res);

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Berhasil mengambil data',
            data: data
        });


    } catch (err) {
        return response500(res, err.message);
    }
}

module.exports = {
    storeDHT,
    showDHT,
    storeVolume,
    showVolume
}