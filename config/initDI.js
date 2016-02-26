'use strict';

let _ = require('lodash');
let format = require('fomatto').Formatter();
let messages = require('./messages')

let Logger = require('../lib/logger/Logger');
let IndexController = require('../controllers/IndexController');
let AuthenticationService = require('../lib/services/AuthenticationService');

class DI{
    constructor(config) {
        this._resgistries = [];
        this._config = config;
        this._initialize();
    }

    _initialize() {
        let that = this;

        let logger = new Logger(that._config.loggerLevel);
        that._registry(Logger, () => {
            return logger;
        });

        let authenticationService = new AuthenticationService(that._config);
        that._registry(AuthenticationService, () => {
            return authenticationService;
        });

        that._registry(IndexController, () => {
            return new IndexController();
        });
    }

    _registry(objectClass, resolveHandler) {
        let that = this;
        let object = _.find(that._resgistries, { name: objectClass.name });
        if (object) {
            throw new Error(format(messages.COMMON.DI_DUPLICATE_REGISTRY, { registry: objectClass.name} ));
        }

        that._resgistries.push({ name: objectClass.name, get: resolveHandler });
    }

    get(objectClass) {
        let that = this;
        var object = _.find(that._resgistries, { name: objectClass.name });

        return _.result(object, "get", null);
    }
}

module.exports = DI;