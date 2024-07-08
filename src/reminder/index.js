const express = require("express");

const ReminderController = require('./controller');

const router = express.Router();

module.exports.ReminderAPI = (app) => {
  router
    .post("/", ReminderController.list)
    .post("/register", ReminderController.register)

    app.use('/api/reminder', router);
};
