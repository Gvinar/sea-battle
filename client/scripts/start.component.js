(function(app) {
    app.AppStart =
        ng.core.Component({
            selector: 'start-app',
            template:
            '<div class="start">' +
            '<button class="start__button start__button_big">Start Game</button>' +
            '<button class="start__button">Sign In</button>' +
            "<button [routerLink]="['/sigh_in']" class='start__button'>Sign Up</button>" +
            "<p class='start__text'>If you won't login, you can't save the game!</p>" +
            '</div>'
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