/**
 * Created by henry on 2017/3/28 0028.
 */
"use strict";

module.exports.rules =  {
	identity: {
		required: {},
		string: {min: 5, max: 255},
	},
	password: {
		required: {},
		string: {min: 6, max: 60},
	},
};