/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

module.exports.rules =  {
	role_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Role', targetAttribute: 'id'}
	},
	user_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'UserCommon', targetAttribute: 'id'}
	},
	'role_id, user_id': {
		unique: {message: '角色ID和用户ID的组合已被占用', targetAttribute: ['role_id', 'user_id']}
	}
};