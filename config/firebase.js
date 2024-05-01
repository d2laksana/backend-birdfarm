"use strict"

const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

require('dotenv').config();

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     databaseURL: process.env.databaseURL,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId
// };

const firebaseConfig = {
    apiKey: "AIzaSyAEFT9PURvTyOBTtWxzg_UFhNGlsBAkVyI",
    authDomain: "birdfarm-36e07.firebaseapp.com",
    databaseURL: "https://birdfarm-36e07-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "birdfarm-36e07",
    storageBucket: "birdfarm-36e07.appspot.com",
    messagingSenderId: "880525860323",
    appId: "1:880525860323:web:87a94e0e0b73f7021a54d6",
    measurementId: "G-6PYCYWVM46"
};

// init firebase

const fire = initializeApp(firebaseConfig);
const dbFire = getDatabase(fire)

module.exports = {
    fire,
    dbFire
};