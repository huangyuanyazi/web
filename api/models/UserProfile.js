/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

module.exports.rules =  {
	user_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'User', targetAttribute: 'id'}
	},
	nickname: {
		string: {min: 2, max: 50},
	},
	points: {
		integer: {min: 0, max: 2147483647},
	},
	frozen_points: {
		integer: {min: 0, max: 2147483647},
	},
	balance: {
		float: {min: 0.0, max: 99999999.99}
	},
	frozen_balance: {
		float: {min: 0.0, max: 99999999.99}
	},
	gender: {
		in: {range: ['M', 'F'], strict: true}
	},
	birthday: {
		date: {format: 'yyyy-MM-dd'}
	},
	avatar: {
		string: {min: 2, max: 255},
	},
	qq: {
		string: {min: 5, max: 20},
	},
	register_ip: {
		integer: {min: 0, max: 2147483647},
	},
	logged_in_ip: {
		integer: {min: 0, max: 2147483647},
	},
	logged_in_at: {
		integer: {min: 0, max: 2147483647},
	}
};