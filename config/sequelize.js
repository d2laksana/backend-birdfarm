"use strict";

require('dotenv').config();
const { Sequelize } = require("sequelize");
const config = require('./config');

const sequelize = new Sequelize(config.development);


// test connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Terhubung ke database');
    } catch (error) {
        console.log('Gagal terhubung ke database');
    }
}

testConnection();

module.exports = sequelize;