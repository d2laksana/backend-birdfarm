"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const JwtMiddleware = require('./middlewares/jwtMiddleware');
require('dotenv').config();

const UserRoute = require('./routes/UserRoute');
const AuthRoute = require('./routes/AuthRoute');
const TempRoute = require('./routes/TempRoute');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// Routes

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use('/api/user', JwtMiddleware, UserRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/suhu', TempRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
})