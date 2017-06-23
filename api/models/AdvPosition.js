/**
 * Created by henry on 2017/5/9 0009.
 */
"use strict";

const TYPE_IMG = 1;
const TYPE_SLIDE = 2;
const TYPE_FLASH = 3;
const TYPE_TEXT = 4;

module.exports.TYPE_IMG = TYPE_IMG;
module.exports.TYPE_SLIDE = TYPE_SLIDE;
module.exports.TYPE_FLASH = TYPE_FLASH;
module.exports.TYPE_TEXT = TYPE_TEXT;
module.exports.type = {
	TYPE_IMG: '图片',
	TYPE_SLIDE: '幻灯片',
	TYPE_FLASH: 'Flash',
	TYPE_TEXT: '文本'
};
module.exports.rules =  {
	code: {
		required: {},
		string: {max: 20},
		unique: {}
	},
	description: {
		required: {},
		string: {max: 100},
	},
	type: {
		required: {},
		enum: {range: [TYPE_FLASH, TYPE_IMG, TYPE_SLIDE, TYPE_TEXT]},
	},
	width: {
		required: {},
		integer: {min: 1, max: 100000},
	},
	default: {
		json: {}
	},
	height: {
		required: {},
		integer: {min: 1, max: 100000},
	},
	total: {
		required: {},
		integer: {min: 1, max: 2147483647},
	},
	price: {
		required: {},
		float: {min: 0.0, max: 99999999.99},
	},
	remark: {
		string: {max: 255},
	}
};