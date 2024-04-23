"use strict";

const response400 = (res, msg) => {
    return res.status(400).json({
        success: false,
        code: 400,
        message: msg ? msg : 'Bad Request'
    })
}

const response401 = (res, msg) => {
    return res.status(401).json({
        success: false,
        code: 401,
        message: msg ? msg : 'Unauthorized',
        description: 'Please add your Bearer token in the Authorization header'
    })
}

const response403 = (res, msg) => {
    return res.status(403).json({
        success: false,
        code: 403,
        message: msg ? msg : 'Forbidden'
    })
}

const response500 = (res, msg) => {
    return res.status(500).json({
        success: false,
        code: 500,
        message: msg ? msg : 'Internal Server Error'
    })
}

const response404 = (res, msg) => {
    return res.status(404).json({
        success: false,
        code: 404,
        message: msg ? msg : 'Not Found'
    })
}

module.exports = {
    response400,
    response401,
    response403,
    response404,
    response500
}