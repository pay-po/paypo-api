require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
};