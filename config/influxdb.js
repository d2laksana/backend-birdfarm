"use strict";

const { InfluxDB } = require("@influxdata/influxdb-client");



const influxClient = new InfluxDB({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN
});

module.exports = influxClient;