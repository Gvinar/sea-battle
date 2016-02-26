'use strict';

let bunyan   = require ("bunyan");

class Logger {
	constructor (level) {
		this._level = level || "info";
		this._logger = bunyan.createLogger( {
			name       : "Logger",
			stream     : process.stdout,
			level      : level,
			serializers: bunyan.stdSerializers
		} );

		return this;
	}

	fatal (text, obj) {
		this._logger.fatal(this._result(obj), text);
		return this;
	}

	error (text, obj) {
		this._logger.error(this._result(obj), text);
		return this;
	}

	warn (text, obj) {
		this._logger.warn(this._result(obj), text);
		return this;
	}

	info (text, obj) {
		this._logger.info(this._result(obj), text);
		return this;
	}

	debug (text, obj) {
		this._logger.debug(this._result(obj), text);
		return this;
	}

	trace (text, obj) {
		this._logger.trace(this._result(obj), text);
		return this;
	}

	_result (obj) {
		obj = obj || {};
		return obj
	}
}

module.exports = Logger;
