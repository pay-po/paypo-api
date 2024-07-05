const express = require("express");

const AuthController = require('./controller');

const router = express.Router();

module.exports.LoginAPI = (app) => {
  router
    .post("/", AuthController.login)

    app.use('/api/auth', router);
};
