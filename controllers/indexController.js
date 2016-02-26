"use strict";

let path = require('path');
let BaseController = require('./BaseController');

class IndexController extends BaseController{
    getStartPage(request, response){
        let startPagePath = path.resolve("client/views/index.html");
        response.sendFile(startPagePath);
    }
}

/**
 *
 * @type {IndexController}
 */
module.exports = IndexController;