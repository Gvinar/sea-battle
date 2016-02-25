'use strict';

let _ = require('lodash');
let format = require('fomatto').Formatter();
let messages = require('./messages')

let IndexController = require('../controllers/indexController');
let AuthenticationService = require('../lib/services/authenticationService');

class DI{
    constructor(config) {
        this._resgistries = [];
        this._config = config;
        this._initialize();
    }

    _initialize() {
        var that = this;

        var authenticationService = new AuthenticationService(that._config);
        that._registry(AuthenticationService, function () {
            return authenticationService;
        });

        that._registry(IndexController, function () {
            return new IndexController();
        });
    }

    _registry(objectClass, resolveHandler) {
        var that = this;
        var object = _.find(that._resgistries, { name: objectClass.name });
        if (object) {
            throw new Error(format(messages.COMMON.DI_DUPLICATE_REGISTRY, { registry: objectClass.name} ));
        }

        that._resgistries.push({ name: objectClass.name, get: resolveHandler });
    }

    get(objectClass) {
        var that = this;
        var object = _.find(that._resgistries, { name: objectClass.name });

        return _.result(object, "get", null);
    }
}

module.exports = DI;