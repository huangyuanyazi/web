/**
 * Created by henry on 2017/3/31 0031.
 */
"use strict";

module.exports.rules =  {
	username: {
		required: {},
		string: {min: 5, max: 100},
		unique: {targetClass: 'User'}
	},
	password: {
		required: {},
		string: {min: 6, max: 60},
		compare: [
			{},
			{compareAttribute: 'pay_password', operator: '!=='}
		],
		password: {}
	},
	password_repeat: {
		required: {},
		string: {min: 6, max: 60}
	},
	email: {
		required: {},
		string: {min: 6, max: 255},
		email: {},
		unique: {targetClass: 'User'}
	}
};