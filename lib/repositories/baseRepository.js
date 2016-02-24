"use strict";

let Promise = require('bluebird');
let format = require('fomatto').Formatter();
let mongoose = Promise.promisifyAll(require('mongoose'));
let _ = require('lodash');
let messages = require('../../../config/messages.json');

let connectionPromise = null;
let connection = null;

class BaseRepository{
    /**
     *
     * @param {object} config - application config
     * @param {object} logger - instance of logger
     * @param {object} collectionName - concrete repository collection name
     * @param {object} schemaObject - schema of the collection model
     * @constructor
     */
    constructor(config, logger, collectionName, schemaObject){
        this._config = config;
        this._logger = logger;
        this._collectionName = collectionName;
        this._schemaObject = schemaObject;
        this._model = null;
    }

    /**
     * Saving passed item to MongoDB collection.
     * @access public
     * @method save
     * @param {object} item - represents item which needs to be stored.
     * @returns {Promise.<object>} - returns promise with stored item.
     */
    save(item) {
        let that = this;

        return that._connect()
            .then(function () {
                return that._model(item).saveAsync()
                    .then(function (resultData) {
                        return resultData[0];
                    })
                    .catch(function (error) {
                        let errors = _.map(error.errors, error => {
                                return error.message;
                            })
                            .join(", ");

                        let resultError = format(messages.DATABASE.ERRORS_DURING_SAVING, { collectionName: that._collectionName.toLowerCase(), errors: errors });
                        that._logger.error(resultError);
                        return Promise.reject(Error(resultError));
                    });
            });
    }

    /**
     * Find elements in entire collection by query.
     * @access public
     * @method find
     * @param {string} query - query generated to retrieve specific data.
     * @returns {Promise.<Array.<object>>} - returns promise with array of retrieved data.
     */
    find(query) {
        var that = this;

        return that._connect()
            .then(() => {
                return that._model.findAsync(query)
                    .catch(function (err) {
                        that._logger.error(err.message);
                        return Promise.reject(err);
                });
            });
    }

    /**
     * Find element by id and update in entire collection.
     * @access public
     * @method updateById
     * @param {number} id - id of record.
     * @param {object} data - object with new values for updated fields.
     * @returns {Promise.<Array.<object>>} - returns promise with updated item.
     */
    updateById(id, data) {
        var that = this;

        return that._connect()
            .then(function () {
                return that._model.findByIdAndUpdateAsync(id, data);
            })
            .catch(function (err) {
                that._logger.error(err.message);
                return Promise.reject(err);
            });
    }

    _initialize(){
        let that = this;

        return that._connect()
            .then(() => {
                that._model = connection.models[that._collectionName] ||  connection.model(that._collectionName, that._schemaObject);
            });
    }

    _connect(){
        let that = this;

        if (connectionPromise) {
            return connectionPromise;
        }

        connectionPromise = new Promise((resolve, reject) => {
            that._logger.info(format(messages.DATABASE.MONGO_CONNECTING, { uri: that._config.database.connectionUrl }));

            let options = {
                server: {
                    socketOptions: { keepAlive: 5, connectTimeoutMS: 30000 }
                },
                replset: {
                    socketOptions: { keepAlive: 5, connectTimeoutMS: 30000 }
                }
            };
            connection = Promise.promisifyAll(mongoose.createConnection(that._config.database.connectionUrl, options));

            connection.on('close', () => {
                that._disconnect();
            });

            connection.on('reconnected', () => {
                this.connect();
            });

            connection.once('error', error => {
                if (error.code === '18') {
                    that._logger.error(format(messages.DATABASE.AUTH_ERROR, { message: error.message }));
                }
                else {
                    that._logger.error(format(messages.DATABASE.CONNECTION_ERROR, { name: error.name, message: error.message }));
                }

                if (connectionPromise && !connectionPromise.isRejected() && !connectionPromise.isFulfilled()){
                    reject(error);
                }

                that._disconnect()
                    .catch(err => {
                        that._logger.error(format(messages.DATABASE.CLOSE_CONNECTION_FAIL, { error: JSON.stringify(err) }));
                    });
            });

            connection.once('open', () => {
                that._logger.info(messages.DATABASE.CONNECTION_OPENED);
                resolve(connection);
            });
        });

        return connectionPromise;
    }

    _disconnect() {
        if (!connectionPromise) {
            return Promise.resolve();
        }

        connection.removeAllListeners("open");
        connection.removeAllListeners("close");

        return mongoose.disconnectAsync()
            .then(() => {
                this._logger.info(messages.DATABASE.CONNECTION_CLOSED);
                connectionPromise = null;
            }).catch(err => {
                let error = { message: format(messages.DATABASE.DISCONNECT_FAILED, { error: JSON.stringify(err) }), statusCode: 500 };
                this._logger.error(error.message);
                return Promise.reject(error);
            });
    }
}

/**
 *
 * @type {BaseRepository}
 */
module.exports = BaseRepository;