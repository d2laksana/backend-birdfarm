"use strict";

const { randomBytes } = require("crypto")

const genApiKey = () => {
    return randomBytes(32).toString('hex');
}

module.exports = genApiKey;