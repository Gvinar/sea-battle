'use strict';

let express = require('express');
let format = require('fomatto').Formatter();
let routes = require('./routes/routes');
let messages = require('./config/messages');
let config = require('./config/config');
let DI = new require("./config/initDI");
let IndexController = require('./controllers/IndexController');
let Logger = require('./lib/logger/Logger');

let app = express();
let di = new DI(config);

let logger = di.get(Logger);
let indexController = di.get(IndexController);

routes.setup(app, indexController);

//start application
app.listen(config.applicationPort, () => {
    logger.info(format(messages.COMMON.APPLICATION_STARTED, { port: config.applicationPort }));
});