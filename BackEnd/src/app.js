import { respondWithError } from './helpers/messageResponse';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('../database/models');
const routerManager = require('./routes');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// cors  configuration
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Authorization', 'Accept-Language'],
    credentials: true,
};

app.use(cors(corsOptions));

// log configuration
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, '../logs'),
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

routerManager(app);

app.use(express.static(path.join(__dirname, '../public')));

// error handler
const {
    ERROR_CODE_SYSTEM_ERROR,
    ERROR_CODE_API_NOT_FOUND,
} = require('./helpers/errorCodes');

// 404 error
app.use((req, res) => {
    res.json(respondWithError(ERROR_CODE_API_NOT_FOUND, 'API not found'));
});
// 500 error
app.use((err, req, res) => {
    console.log(`500 error: ${err.message}`);
    res.json(respondWithError(ERROR_CODE_SYSTEM_ERROR, `System error: ${err.message}`, err));
});
module.exports = app;
