const express = require("express");

const UserController = require('./controller');

const router = express.Router();

module.exports.UserAPI = (app) => {
  router
    .post("/", UserController.login)
    .post("/register", UserController.register)

    app.use('/api/user', router);
};
