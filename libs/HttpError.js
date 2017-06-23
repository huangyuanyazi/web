/**
 * Created by henry on 2017/3/18 0018.
 */
"use strict";
function HttpError(statusCode, message) {
	this.statusCode = statusCode;
	this.message = message || '请求失败';
	this.stack = (new Error()).stack;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;