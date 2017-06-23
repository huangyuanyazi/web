/**
 * Created by henry on 2017/5/24 0024.
 */
"use strict";

module.exports.rules = {
	store_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Store', targetAttribute: 'id'}
	}
};