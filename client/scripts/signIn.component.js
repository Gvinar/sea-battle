(function(app) {
    app.AppSignIn =
        ng.core.Component({
            selector: 'sign-in',
            template:
            '<div class="start">' +
            "<input  class='sign-in__name'>" +
            "<input  class='sign-in__pass'>" +
            '<button class="start__button">Sign In</button>' +
            '<button class="start__button">< Back</button>' +
            "</div>"
})
.Class({
    constructor: function() {}
});
})
(window.app || (window.app = {}));