"use strict";

class User{
    /**
     *
     * @param {string} username - username
     * @param {string=} password= - password
     * @param {string=} displayName= - display name of user
     * @constructor
     */
    constructor(username, password, displayName){
        if (!username){
            throw new Error("Username is missing");
        }

        this.username = username;
        this.password = password;
        this.displayName = displayName;
    }
}

/**
 *
 * @type {User}
 */
module.exports = User;