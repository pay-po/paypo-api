const express = require('express');
const debug = require('debug')('app:main');
const http = require('http');
const cors = require('cors');
const createError = require('http-errors');

const { Config } = require('./src/config/index');
const { Response } = require('./src/common/response');
const { UserAPI } = require('./src/user/index');
const { ReminderAPI } = require('./src/reminder/index');
const { DetailReminderAPI } = require('./src/detail_reminder/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.get("/", (req,res) => {
    res.send("Pagina de inicio")
})

UserAPI(app);
ReminderAPI(app);
DetailReminderAPI(app);

function logErrors(err, req, res, next) {
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        Response.error(res, new createError[500]);
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    Response.error(res, new createError[500]);
}

const server = http.createServer(app).listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});
