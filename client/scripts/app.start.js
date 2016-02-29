(function(app) {
    app.AppStart =
        ng.core.Start({
            selector: 'my-app',
            template:
    '<div class="start">' +
    '<button class="start__button start__button_big">Start Game</button>' +
    '<button class="start__button">Sign In</button>' +
    '<button class="start__button">Sign Up</button>' +
    "<p class='start__text'>If you won't login, you can't save game!</p>" +
    '</div>'
        })
            .Class({
                constructor: function() {}
            });
})(window.app || (window.app = {}));