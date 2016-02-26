"use strict";


let routes = {
    setup: function (app, indexController) {
        app.get("", (req, res) => {
            indexController.getStartPage(req, res);
        });
    }
};


module.exports = routes;
