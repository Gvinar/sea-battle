'use strict';

let express = require('express');
let routes = require('./routes/routes');
let messages = require('./config/messages');
let config = require('./config/config');
var di = require("./config/initDI");
let IndexController = require('./controllers/indexController');
let logger;

let app = express();
var indexController = di.get(IndexController);

routes.setup(app, indexController);

//start application
app.listen(config.applicationPort, () => {
    logger.info(messages.COMMON.APPLICATION_STARTED, { port: config.applicationPort });
});