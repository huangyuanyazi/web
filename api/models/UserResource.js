/**
 * Created by henry on 2017/3/21 0021.
 */
"use strict";

module.exports.rules =  {
	resource_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Resource', targetAttribute: 'id'}
	},
	user_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'UserCommon', targetAttribute: 'id'}
	},
	'resource_id, user_id': {
		unique: {message: '权限ID和用户ID的组合已被占用', targetAttribute: ['resource_id', 'user_id']}
	}
};