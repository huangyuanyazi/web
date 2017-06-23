/**
 * PHP后端配置
 */
const ipaddr = require('ipaddr.js');
module.exports = {
	whitelist: {
		loopback: [
			ipaddr.parseCIDR('127.0.0.1/8'),
		],
	},
	uploadDir: '/www/tmp/upload'
};