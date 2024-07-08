const express = require("express");

const DetailsReminderController = require('./controller');

const router = express.Router();

module.exports.DetailReminderAPI = (app) => {
  router
    .put("/pay/:idreminder", DetailsReminderController.pay)

    app.use('/api/detailreminder', router);
};
