(function(app) {
    app.AppStart =
        ng.core.Component({
            selector: 'start-app',
            templateURl:../views/start.html
        })
            .Class({
                constructor: function() {}
            });
        ng.router.RouteConfig([
            { path: '/:sigh_in', component: signIn, name: 'sign-in' }
             ])
             .Class({constructor: function() {}
             });
})
(window.app || (window.app = {}));