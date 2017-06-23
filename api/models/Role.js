/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

const TYPE_ADMIN = 1;
const TYPE_STORE = 2;

module.exports.TYPE_ADMIN = TYPE_ADMIN;
module.exports.TYPE_STORE = TYPE_STORE;
module.exports.type = {
	TYPE_ADMIN: '后台管理员',
	TYPE_STORE: '店铺管理员',
};
module.exports.rules =  {
	name: {
		required: {},
		string: {max: 64},
		unique: {targetAttribute: ['name', 'type'], message: '{attribute}的值"{value}"已存在'}
	},
	type: {
		required: {},
		enum: {range: [TYPE_ADMIN,TYPE_STORE]}
	},
	description: {
		string: {max: 128},
	},
	menu_names: {
		json: {
			pattern: [{
				rules: {
					string: {min: 2},
					exist: {targetClass: 'Menu', targetAttribute: 'name'}
				}
			}]
		}
	}
};