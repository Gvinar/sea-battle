(function(app) {
    app.AppStart =
        ng.core.Component({
            selector: 'app-start',
            templateUrl: '../views/start.html'
        })
            .Class({
                constructor: function() {}
            });
})
(window.app || (window.app = {}));