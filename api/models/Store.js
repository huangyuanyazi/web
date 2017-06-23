/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

module.exports.rules = {
	name: {
		required: {},
		string: {max: 50},
		unique: {}
	},
	user_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'User', targetAttribute: 'id'}
	},
	description: {
		string: {max: 255},
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
	contact: {
		json: {}
	},
	registered_at: {
		integer: {min: 0, max: 2147483647},
	},
	banner_path: {
		string: {max: 255},
	},
	index_template_path: {
		string: {max: 255},
	},
	item_template_path: {
		string: {max: 255},
	},
	credit: {
		integer: {min: 0, max: 2147483647},
	},
	follow: {
		integer: {min: 0, max: 2147483647},
	},
	info: {
		json: {}
	},
	support: {
		json: {}
	}
};