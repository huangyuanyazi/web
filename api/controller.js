/**
 * Created by henry on 2017/3/17 0017.
 */
"use strict";

const _ = require('underscore');

const request = require(global.VARS.LIB_PATH + '/request');
const proxy = require(global.VARS.LIB_PATH + '/proxy');

module.exports = async (req, res, action) => {
	console.log('-----------------------------------------------------------------------------');
	console.log('[IP    ]\t:', req.ip, req.ips);
	console.log('[method]\t:', req.method);
	console.log('[query ] \t:', req.query);
	console.log('[param ] \t:', req.params);
	console.log('[body  ] \t:', req.body);

	if(!_.contains(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'], req.method)) {
		return res.status(405).json('不支持的HTTP方法');
	}

	const version = req.params.version;
	let controllerName = request.idToClassName(req.params.controller);
	let controller;

	try {
		controller = require('./controllers/'+ controllerName);
	} catch (err) {
		console.error(err);
		res.status(404).json('请求的资源不存在');
		return;
	}

	if(!_.isFunction(controller.beforeProxy)) controller.beforeProxy = (req, res) => {
		return res;
	};
	if(!_.isFunction(controller.afterProxy)) controller.afterProxy = (req, res) => {
		return res;
	};

	try {
		// 前处理
		res = await controller.beforeProxy(req, res);
		if (res.finished) return;

		// 代理请求后端
		let proxyRes = await proxy.request(req, res);
		res.locals.data = proxyRes.data;
		console.log('[response stats]\t:', proxyRes.status);
		console.log('[response data ]\t:', proxyRes.data);

		// 后处理
		res = await controller.afterProxy(req, res);
		if (res.finished) return;

		res.set(proxyRes.headers);
		res.status(proxyRes.status);
		res.send(proxyRes.data);
	} catch (err) {
		if(err.response) {
			console.log('[response stats]\t:', err.response.status);
			console.log('[response data ]\t:', err.response.data);
			res
				.status(err.response.status)
				.set(err.response.headers)
				.json(err.response.data)
				.end();
		} else {
			console.error(err);
			res
				.status(500)
				.json(err.message)
				.end();
		}
	}
};