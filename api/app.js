/**
 * Created by henry on 2017/3/13 0013.
 */
"use strict";

const app = require("express")();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const process = require('process');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(3000);

const config = require('../libs/config').get('api');
global.CONFIG = config;

const redis = require("redis"),
	redisClient = redis.createClient(config.redis.normal);

const helper = require(global.VARS.LIB_PATH + '/helper');
helper.cacheModuleRules(global.VARS.API_PATH + '/models', redisClient);

app.use(bodyParser.json({limit: "10000kb"})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true, limit: "10000kb" })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(require('./route'));
app.use((req, res, next) => {
	req.redisClient = redisClient;
	return next();
});

app.set('redis-client', redisClient);
app.set('socket.io', io);
app.set('x-powered-by', false);
app.set('trust proxy', true);

process.on('unhandledRejection', function (err) {
	console.error('Unhandled Rejection: ', err);
});

process.on(`uncaughtException`, function (err) {
	console.error('Unhandled Exception: ', err);
});

app.listen(config.api.port, function() {
    console.log('> API server started at '+config.api.port);
});

io.on('connection', (socket) => {
	socket.emit('hello', {});
});