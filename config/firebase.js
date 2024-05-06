"use strict"

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getDatabase } = require('firebase/database');

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

// init firebase

const fire = initializeApp(firebaseConfig);
const dbFire = getDatabase(fire);
const signIn = getAuth(fire);

module.exports = {
    fire,
    dbFire,
    signIn
};