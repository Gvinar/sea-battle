(function(app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'my-app',
            template: '<router-outlet></router-outlet>'
        })
            .Class({
                constructor: function() {}
        });
    ng.router.RouteConfig([
        { path: '/sigh_in', component: AppSignIn, name: 'SignIn' },
        { path: '/start', component: AppStart, name: 'Start',  useAsDefault: true}
    ])
        .Class({constructor: function() {}
        });
})
(window.app || (window.app = {}));