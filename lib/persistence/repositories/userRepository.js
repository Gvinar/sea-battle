"use strict";

let collections = require('../../../../config/collections.json');
let schemas = require('../../../../config/schemas.json');
let BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository{
    /**
     *
     * @param {object} config - application config
     * @param {object} logger - instance of logger
     * @constructor
     */
    constructor(config, logger){
        super(config, logger, collections.USER_COLLECTION, schemas.USER_SCHEMA);
    }
}

/**
 *
 * @type {UserRepository}
 */
module.exports = UserRepository;