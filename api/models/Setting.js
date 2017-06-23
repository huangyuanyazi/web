/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules = {
	key: {
		required: {},
		string: {max: 50},
		unique: {}
	},
	value: {
		required: {},
		string: {},
	},
	description: {
		required: {},
		string: {max: 150},
	},
};