/**
 * Created by henry on 2017/6/20 0020.
 */
"use strict";

module.exports.rules = {
	name: {
		required: {},
		string: {max: 50},
	},
	is_owed: {
		required: {},
		integer: {min: 0, max: 1},
	},
};