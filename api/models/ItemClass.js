/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules = {
	parent_id: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'ItemClass', targetAttribute: 'id'}
	},
	name: {
		required: {},
		string: {max: 20},
		unique: {}
	},
	index_template_path: {
		string: {max: 256},
	},
	search_template_path: {
		string: {max: 256},
	},
	detail_template_path: {
		string: {max: 256},
	},
	code: {
		required: {},
		string: {min: 2, max: 20},
		unique: {}
	},
	keywords: {
		json: {
			pattern: [{
				rules: {
					string: {min: 1}
				}
			}]
		}
	},
	description: {
		string: {max: 255},
	},
	attributes: {
		json: {}
	},
	specs: {
		json: {}
	},
	order: {
		integer: {min: 0, max: 2147483647},
	}
};