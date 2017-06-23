/**
 * Created by henry on 2017/6/15 0015.
 */
"use strict";

module.exports.rules =  {
	sn: {
		patent: {},
		unique: {}
	},
	name: {
		string: {max: 200},
	},
	payment_status_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'CsPaymentStatus', targetAttribute: 'id'}
	},
	contact: {
		required: {},
		string: {max: 20},
	},
	username: {
		required: {},
		string: {max: 50},
	},
	internal_sn: {
		required: {},
		string: {max: 20},
		unique: {}
	},
	email: {
		required: {},
		string: {max: 50},
		email: {}
	},
	mobile: {
		required: {},
		string: {max: 20},
		mobile: {}
	},
	qq: {
		required: {},
		string: {max: 20},
		match: {pattern: '/^\\d{5,20}$/', message: 'QQ号无效'}
	},
	weixin: {
		required: {},
		string: {max: 50},
	},
	address: {
		required: {},
		string: {max: 200},
	},
	first_inventor_name: {
		required: {},
		string: {max: 50},
	},
	first_inventor_id: {
		required: {},
		string: {max: 20},
		id: {}
	},
	other_inventor_names: {
		string: {max: 200},
	},
	first_holder_name: {
		required: {},
		string: {max: 50},
	},
	first_holder_id: {
		required: {},
		string: {min: 8, max: 20},
		//id: {}
	},
	first_holder_address: {
		required: {},
		string: {max: 200},
	},
	first_holder_zip_code: {
		required: {},
		string: {max: 10},
		match: {pattern: '/^\\d{6}$/', message: '第一专利权人邮编无效'}
	},
	other_holders: {
		json: {
			pattern: [{
				name: {
					rules: {required:{}, string: {}}
				},
				id: {
					rules: {required:{}, id: {}}
				}
			}]
		}
	},
	closed: {
		enum: {range: [0, 1]}
	}
};