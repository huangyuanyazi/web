/**
 * Created by henry on 2017/3/30 0030.
 */
"use strict";

const url = require('url');
const axios = require('axios');
const qs = require('qs');
const _ = require('underscore');

const helper = require('./helper');
const request = require('./request');
const config = require('./config').get();

let proxy = class {
	static request(req, res, path='', method='', host='', port='', protocol='') {
		let data = req.body;
		if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
			data = qs.stringify(req.body);
		}

		let headers = req.headers;
		headers['x-private-domain'] = request.getPrivateDomain(req, global.CONFIG.whitelist);

		path = path || req.path;
		host = host || config.backend.host;
		port = port || config.backend.port;
		protocol = protocol || config.protocol;
		let url = protocol+'://'+host+':'+port + path;
		method = method || req.method;
		return new Promise((resolve, reject) => {
			return axios({
				method: method,
				url: url,
				data: data,
				headers: headers,
				params: req.query
			}).then(response => {
				//console.log(response);
				resolve(response);
			}).catch(err => {
				reject(err);
			});
		});
	};
};
module.exports = proxy;