const createError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "OK", data = {}) => {
    res.status(status).setHeader("content-type", "application/json").json(data);
  },
  error: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).setHeader("content-type", "application/json").json({message});
  },
};