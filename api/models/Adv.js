/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules =  {
	adv_position_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'AdvPosition', targetAttribute: 'id'}
	},
	title: {
		required: {},
		string: {max: 255},
	},
	content: {
		json: {}
	},
	begin: {
		integer: {min: 0, max: 2147483647},
		compare: {compareAttribute: 'end', operator: '<', type: 'number'}
	},
	end: {
		integer: {min: 0, max: 2147483647},
		compare: {compareAttribute: 'begin', operator: '>', type: 'number'}
	},
	user_id: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'User', targetAttribute: 'id'}
	},
	price: {
		required: {},
		float: {min: 0.0, max: 99999999.99},
	},
	remark: {
		string: {max: 255},
	}
};