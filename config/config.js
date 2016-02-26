"use strict";

let format = require('fomatto').Formatter();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "production";
}
require("./appDefaultEnv_" + process.env.NODE_ENV);

let config = {
    applicationPort: process.env.APPLICATION_PORT,
    loggerLevel: process.env.LOGGER_LEVEL,
    database: {
        connectionUrl: format(process.env.DB_URL, { username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, dbName: process.env.DB_NAME })
    }
};

module.exports = config;