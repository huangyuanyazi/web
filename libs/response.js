/**
 * Created by henry on 2017/5/11 0011.
 */
"use strict";

const _ = require('underscore');

module.exports = class {
	static reject(req, res, whiteList=[], message='') {
		if(!_.contains(whiteList, req.ip)) {
			res.status(401).json(message).end();
		}
		return res;
	};
	static accept(req, res, blackList=[], message='') {
		if(_.contains(blackList, req.ip)) {
			res.status(401).json(message).end();
		}
		return res;
	}
};