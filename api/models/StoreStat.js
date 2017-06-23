/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules =  {
	store_id: {
		required: {},
		integer: {min: 0, max: 2147483647},
		exist: {targetClass: 'Store', targetAttribute: 'id'},
		unique: {}
	},
	stats: {
		json: {}
	}
};