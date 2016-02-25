"use strict";

let BaseController = require('./baseController');

class IndexController extends BaseController{
    getStartPage(request, response){
        let startPagePath = path.resolve("client/views/index.html");
        response.sendfile(startPagePath);
    }
}

/**
 *
 * @type {IndexController}
 */
module.exports = IndexController;