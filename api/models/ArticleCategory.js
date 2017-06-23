/**
 * Created by henry on 2017/3/21 0021.
 */
"use strict";

module.exports.rules =  {
	name: {
		required: {},
		string: {max: 20},
		unique: {}
	},
	code: {
		required: {},
		string: {max: 20},
		unique: {}
	},
	parent_id: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'ArticleCategory', targetAttribute: 'id'}
	},
	order: {
		integer: {min: 0, max: 2147483647},
	},
	template_path: {
		string: {max: 256},
	},
	image_path: {
		string: {max: 256},
	}
};