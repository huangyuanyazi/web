/**
 * Created by henry on 2017/3/22 0022.
 */
"use strict";

module.exports.rules =  {
	name: {
		required: {},
		string: {max: 64},
		unique: {}
	},
	parent_id: {
		integer: {min: 0, max: 2147483647},
		exist: {targetClass: 'Menu', targetAttribute: 'id'}
	},
	description: {
		string: {max: 64}
	},
	rule: {
		string: {max: 64}
	},
	resource_names: {
		json: {
			pattern: [{
				rules: {
					string: {min: 2},
					exist: {targetClass: 'Resource', targetAttribute: 'name'}
				}
			}]
		}
	}
};