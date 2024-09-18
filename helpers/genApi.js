"use strict";

const { v4: uuidv4 } = require('uuid');

const genApiKey = () => {
    return uuidv4();
}

module.exports = genApiKey;