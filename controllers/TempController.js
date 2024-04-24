"use strict";

const { validationResult } = require("express-validator");
const Users = require("../models/users");
const { response400, response500 } = require("../helpers/response");
const influxClient = require("../config/influxdb");
const { Point } = require("@influxdata/influxdb-client");


async function store(req, res) {
    try {
        const error = validationResult(req);
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

async function show(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.response400(res, error.array().map(e => e.msg));

        const queryApi = influxClient.getQueryApi(process.env.INFLUX_ORG);
        const fluxQuery = `from(bucket: "${process.env.INFLUX_BUCKET}")
        |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "suhu")
  |> filter(fn: (r) => r["_field"] == "humidity" or r["_field"] == "temperature")
  |> filter(fn: (r) => r["apikey"] == "${req.headers['x-api-key']}")
  |> yield(name: "last")`;
        const result = [];
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
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

    }
}


module.exports = {
    store,
    show
}