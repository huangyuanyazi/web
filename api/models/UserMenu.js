/**
 * Created by henry on 2017/3/21 0021.
 */
"use strict";

module.exports.rules =  {
	menu_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Menu', targetAttribute: 'id'}
	},
	user_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'UserCommon', targetAttribute: 'id'}
	},
	'menu_id, user_id': {
		unique: {message: '界面ID和用户ID的组合已被占用', targetAttribute: ['menu_id', 'user_id']}
	}
};