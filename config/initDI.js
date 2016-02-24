'use strict';

let di = require("di");
let _ = require('lodash');

let config = require("./config");

let IndexController = require('../controllers/indexController');

let AuthenticationService = require('../lib/services/authenticationService');


di.annotate(wrapClass(IndexController));
di.annotate(wrapClass(AuthenticationService), new di.Inject(config));

var injector = new di.Injector([]);

function wrapClass(TargetClass){
    return new TargetClass(_.slice(arguments, 1));
}

module.exports = injector;

