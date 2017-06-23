/**
 * Created by henry on 2017/3/17 0017.
 */
"use strict";
const router = require("express").Router();
const controller = require('./controller');

router.all('/:version/:controller/:action', (req, res, next) => {
	controller(req, res);
});

router.all('/:version/:controller', (req, res, next) => {
	controller(req, res);
});

router.all('/:version/:controller/*', (req, res, next) => {
	controller(req, res);
});

module.exports = router;