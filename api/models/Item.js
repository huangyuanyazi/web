/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

const STATUS_DEL = 0;   //已删除
const STATUS_ON = 1;    //上架
const STATUS_EXAM = 2;  //审核中
const STATUS_OFF = 3;   //下架

module.exports.STATUS_DEL = STATUS_DEL;
module.exports.STATUS_ON = STATUS_ON;
module.exports.STATUS_EXAM = STATUS_EXAM;
module.exports.STATUS_OFF = STATUS_OFF;
module.exports.status = {
	STATUS_DEL: '已删除',
	STATUS_ON: '已上架',
	STATUS_EXAM: '审核中',
	STATUS_OFF: '已下架'
};
module.exports.rules = {
	name: {
		required: {},
		string: {max: 50}
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
	store_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Store', targetAttribute: 'id'}
	},
	item_class_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'ItemClass', targetAttribute: 'id'}
	},
	item_class_ids: {
		json: {
			pattern: [{
				rules: {
					integer: {min: 1},
					exist: {targetClass: 'ItemClass'}
				}
			}]
		}
	},
	price: {
		required: {},
		float: {min: 0.0, max: 99999999.99},
	},
	follow: {
		integer: {min: 0, max: 2147483647},
	},
	sale: {
		integer: {min: 0, max: 2147483647},
	},
	storage: {
		integer: {min: 0, max: 2147483647},
	},
	description: {
		string: {},
	},
	images: {
		json: {
			pattern: [{
				rules: {
					string: {min: 5}
				}
			}]
		}
	},
	status: {
		enum: {range: [STATUS_EXAM, STATUS_OFF, STATUS_ON, STATUS_DEL]}
	},
	attributes: {
		required: {},
		json: {patternClass: 'ItemClass'}
	},
	specs: {
		json: {}
	},
	remark: {
		string: {max: 255},
	},
	shelved_at: {
		integer: {min: 0, max: 2147483647},
	},
	uuid: {
		unique: {}
	},
	sn: {
		required: {},
		string: {max: 20},
		unique: {message: '序列号在此店铺中已被占用', targetAttribute: ['sn', 'store_id']}
	}
};
