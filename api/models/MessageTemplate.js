/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules = {
	name: {
		required: {},
		string: {max: 50},
	},
	message: {
		string: {},
	},
	sms: {
		string: {max: 120},
	},
	sms_code: {
		string: {max: 32},
	},
	mail: {
		string: {},
	},
};