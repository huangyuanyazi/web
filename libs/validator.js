/**
 * Created by henry on 2017/3/14 0014.
 */
"use strict";

const _ = require('underscore');
_.templateSettings = {
	interpolate: /\{(.+?)\}/g
};
const validator = require('validator');
const qs = require('qs');
const axios = require('axios');

/**
 * 写验证规则时，本地验证写在前面，远程验证写在后面，以加快响应速度
 *  所有验证器返回一个函数，其参数统一为：
 *  validation  -   validation实例
 *  field       -   字段名
 *  value       -   字段值
 *  label       -   字段描述
 *  以上参数由验证调度者传入
 */
 let ModelValidator = class {
	/**
	 * 是否为必须的字段
	 * @param validation    validation实例
	 * @param field         string
	 * @return boolean
	 */
	static isRequired(validation, field) {
		return _.contains(validation.model.required, field);
	};

	/**
	 * 是否为空，包括[]、''、null、undefined、{}
	 * @param value
	 * @param strict  boolean  如果为严格模式，那么会去掉首尾的空格
	 * @return {*|boolean}
	 */
	static isEmpty(value, strict=false) {
		if(strict && _.isString(value)) value = value.trim();
		return _.isNull(value) || _.isUndefined(value) || value === '';
	};

	/**
	 * 是否包含多个字段
	 * @param field
	 * @return {boolean}
	 */
	static isMultiField(field) {
		return field.indexOf(',') > 0;
	};

	/**
	 * 从多个字段中分离出属性
	 * 输入'name, type'，
	 * 若targetField为空，则输出   [['name', 'tq', '淘权'], ['type', 1, '后台']
	 * 若targetField为'desc, status'，则输出[['desc', 'taoquan', '淘权->淘权网'], ['status', 0, '后台->未激活']
	 * @param validation    validation实例
	 * @param field         string          'name, type'
	 * @param targetField   string          'desc, status'
	 * @param skipEmpty     boolean
	 * @return {Array}
	 */
	static getAttributes(validation, field, targetField='', skipEmpty=true) {
		let attributes = [];
		let fields, targetFields = [];
		// 逗号分隔的表示多个字段的组合
		if (field.indexOf(',') > 0) {
			fields = _.map(field.split(','), str=>{return str.trim()});
		} else fields = Array(field);

		if (_.isEmpty(targetField)) targetFields = fields;
		else if (targetField.indexOf(',' > 0)) {
			targetFields = _.map(targetField.split(','), str=>{return str.trim()});
		} else targetFields = Array(targetField);

		if(fields.length !== targetFields.length) throw new Error('属性与目标属性不匹配');
		_.each(targetFields, (tf, i) => {
			let value = validation.data[tf];
			if (!skipEmpty || !this.isEmpty(value)) {
				let label = validation.labels[fields[i]] +
					(validation.labels[fields[i]] ===
					validation.labels[tf]
						? ''
						: `->${validation.labels[tf]}`
					);
				attributes.push([tf, value, label]);
			}
		});
		return attributes;
	};
	/**
	 * 将article_category_id的名称转化为ArticleCategory
	 * 如果是parent_id，则返回模型自身的名字
	 * @param validation    validation实例
	 * @param field
	 * @private
	 */
	static getModelName(validation, field) {
		if(field === 'parent_id') return validation.name;
		if(field.slice(-3) === '_id') {
			field = field.slice(0, -3);
		}
		return _.map(field.split('_'), (str) => {
			return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
		}).join('');
	};
	/**
	 * 验证必须的字段是否存在
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule            type     default     desc
	 *                   -----------------------------------------
	 *                   requireValue    mix                  指定值
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static required(validation, field, value, option, label, ruleOptMsg) {
		let strict = option.strict || false;
		let requireValue = option.requireValue;
		let requireValueMsg = _.template(label + (ruleOptMsg.requireValue || '必须为{requireValue}'));
		let msg = _.template(label + (ruleOptMsg._ || '不能为空'));
		let msgData = {requireValue: requireValue};

		if(strict && _.isString(value)) value = value.trim();

		if(!requireValue) {
			if((strict && value !== null) || (!strict && !this.isEmpty(value))) return [];
		} else if((!strict && value == requireValue) || (strict && value === requireValue)) return [];

		if(requireValue) return [requireValueMsg(msgData)];
		else return [msg(msgData)];
	};
	/**
	 * 验证字符串(范围包含min和max)
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule           type     default     desc
	 *                   -----------------------------------------
	 *                   min            int      0          长度最小值
	 *                   max            int                 长度最大值
	 *                   length         int                 指定长度
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static string(validation, field, value, option, label, ruleOptMsg) {
		let msg = ruleOptMsg._ || '必须为字符串';
		let errors = [];
		if (!_.isString(value)) return [label + msg];

		let min = option.min || 0, max = option.max, length = option.length;
		let minMsg = _.template(label + (ruleOptMsg.min || '应该包含至少{min}个字符'));
		let maxMsg = _.template(label + (ruleOptMsg.max || '只能包含至多{max}个字符'));
		let lengthMsg = _.template(label + (ruleOptMsg.length || '长度必须为{length}个字符'));
		let msgData = {max: max, min: min, length: length};

		let len = value.length;
		if (min && len < min) errors.push(minMsg(msgData));
		if (max && len > max) errors.push(maxMsg(msgData));
		if (length && len !== length) errors.push(lengthMsg(msgData));

		return errors;
	};

	/**
	 * 验证是否为有效的邮箱地址
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static email(validation, field, value, option, label, ruleOptMsg) {
		let msg = ruleOptMsg._ || '不是有效的Email地址';
		if (!_.isString(value)) return [label + '必须为字符串'];
		if (!validator.isEmail(value)) return [label + msg];
	};
	/**
	 * 验证是否为有效的手机号
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule     type      default     desc
	 *                   -----------------------------------------
	 *                   locale   string    zh-CN       地区代码
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static mobile(validation, field, value, option, label, ruleOptMsg) {
		let locale = ruleOptMsg.locale || 'zh-CN';
		if (!_.contains(['ar-DZ', 'ar-SA', 'ar-SY', 'cs-CZ', 'de-DE', 'da-DK', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NG', 'en-NZ', 'en-US', 'en-CA', 'en-ZA', 'en-ZM', 'es-ES', 'en-PK', 'fi-FI', 'fr-FR', 'he-IL', 'hu-HU', 'it-IT', 'ja-JP', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'ro-RO', 'ru-RU', 'sr-RS', 'tr-TR', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW'], locale))
			throw new Error('无效的地区代码');
		if (!_.isString(value)) return [label + '必须为字符串'];

		let msg = ruleOptMsg._ || '不是有效的手机号';
		if (!validator.isMobilePhone(value, locale)) return [label + msg];
	};

	/**
	 * 验证多个字段中至少有count个字段不为空
	 * @param count 默认为1
	 * @return {function(*=, *=, *, *=)}
	 */
	static atLeast(count=1) {
		if(!_.isNumber(count)) throw new Error('无效的数量');
		return (validation, field, value, label) => {
			if(label) label = `[${label}]`;
			let attributes = this.getAttributes(validation, field, '', false);
			let noEmpty = 0;
			let labels = [];
			_.each(attributes, attr => {
				let fld = attr[0];
				let val = attr[1];
				let lbl = attr[2];
				labels.push(lbl);
				if(!this.isEmpty(val)) ++noEmpty;
			});
			if(noEmpty < count) return '['+ labels.join(',') + ']至少应该有' + count + '个值不为空';
		};
	};

	static isIn(val, array, strict = false) {
		for (let i=0; i < array.length; ++i) {
			if((strict && array[i] === val) || (!strict && array[i] == val)) {
				return true;
			}
		}
		return false;
	};

	static isSubset(val, array, strict = false) {
		if (!_.isArray(val)) throw new Error('范围必须为数组');
		for (let i=0; i < val.length; ++i) {
			if(!this.isIn(val[i], array, strict)) {
				return false;
			}
		}
		return true;
	};
	/**
	 * 验证字段值必须出现在给定的数组中
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule       type        default     desc
	 *                   -----------------------------------------
	 *                   range      array                   范围
	 *                   strict     bool        false       使用严格模式（忽略类型）
	 *                   not        bool        false       结果取反
	 *                   allowArray bool        false       验证的值允许为数组
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static in(validation, field, value, option, label, ruleOptMsg) {
		let range = ruleOptMsg.range;
		if (!_.isArray(range)) throw new Error('范围必须为数组');

		let strict = ruleOptMsg.strict || false;
		let not = ruleOptMsg.not || false;
		let allowArray = ruleOptMsg.allowArray || false;
		let msg = label + (ruleOptMsg._ || ('只能在' + JSON.stringify(arr) + '之中'));

		let inRange = false;
		if (allowArray	&& _.isArray(value) && this.isSubset(value, range, strict)) {
			inRange = true;
		}

		if (!inRange && this.isIn(value, range, strict)) {
			inRange = true;
		}

		return not !== inRange ? null : msg;
	};

	/**
	 * 验证字段段值是否等于给定值
	 * @param dst
	 * @param dstField    boolean     true - dst为字段名，false - dst为值
	 * @return {function(*, *, *, *=)}
	 */
	static equal(dst, dstField=false) {
		return (validation, field, value, label) => {
			if(label) label = `[${label}]`;
			let msg = '', dstVal = '';
			if(dstField) {
				dstVal = validation.data[dst];
				msg = label + '必须与[' + validation.labels[dst] + ']的值相同';
			} else {
				dstVal = dst;
				msg = label + '的值必须为' + dstVal;
			}
			if(value !== dstVal) return msg;
		}
	};
	/**
	 * 验证密码是否满足复杂度
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static password(validation, field, value, option, label, ruleOptMsg) {
		const r1=/[A-Z]/;  //uppercase
		const r2=/[a-z]/;  //lowercase
		const r3=/[0-9]/;  //numbers
		const r4=/[~!@#$%^&*()\-_=+{};:<,.>?]/;  // special char
		const r5=/[A-Za-z]/;  //character

		if(!value.match(r5)) {
			return [label + '必须包含字母'];
		}
		if(!value.match(r3)) {
			return [label + '必须包含数字'];
		}
	};
	/**
	 * 验证字段值必须出现在给定的数组中
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule       type        default     desc
	 *                   -----------------------------------------
	 *                   pattern    reg                     正则表达式
	 *                   not        bool        false       结果取反
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static match(validation, field, value, option, label, ruleOptMsg) {
		let pattern = option.pattern;
		let not = option.not || false;
		let msg = option.message;
		if (!_.isString(msg) || msg.length === 0) throw new Error('match验证必须指定错误提示信息');
		if (!_.isString(value)) throw new Error('只能对字符串进行match验证');
		let regExp = eval(pattern);
		if (!_.isRegExp(regExp)) throw new Error('验证参数不是有效的正则表达式');

		if (!value.match(regExp)) return [label + msg];
	};

	static compareValues(operator, type, value, compareValue) {
		if(type === 'string') {
			value = String(value);
			compareValue = String(compareValue);
		} else if(type === 'number') {
			value = Number(value);
			compareValue = Number(compareValue);
		}
		switch (operator) {
			case '==':
				return value == compareValue;
			case '===':
				return value === compareValue;
			case '!=':
				return value != compareValue;
			case '!==':
				return value !== compareValue;
			case '>':
				return value > compareValue;
			case '>=':
				return value >= compareValue;
			case '<':
				return value < compareValue;
			case '<=':
				return value <= compareValue;
			default:
				throw new Error('未知的比较操作符：' + operator);
		}
	};
	/**
	 * 验证字段值与给定的值或字段值的比较结果是否为真
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule             type        default     desc
	 *                   ---------------------------------------------
	 *                   type             string      string      值类型，可以为string或number
	 *                   compareAttribute string                  要比较的字段
	 *                   compareValue     string|number           要比较的值
	 *                   operator         string      ==          比较操作符，可以为==、===、!=、!==、>、>=、<、<=
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static compare(validation, field, value, option, label, ruleOptMsg) {
		let type = option.type || 'string';
		if(!_.contains(['string', 'number'], 'string')) throw new Error('type只能为string或number');
		let compareAttribute = option.compareAttribute;
		let compareValue = option.compareValue || null;
		let operator = option.operator || '==';
		let msg = ruleOptMsg._;

		if(compareValue === null) {
			compareAttribute = compareAttribute ? compareAttribute : (field + '_repeat');
			compareValue = validation.data[compareAttribute];
			if(!compareValue) return [];
		}

		let dst = compareAttribute ? (`"${compareAttribute}的值"`) : (`"${compareValue}"`);

		if(!msg) {
			switch (operator) {
				case '==':
					msg = '必须等于' + dst;
					break;
				case '===':
					msg = '必须等于' + dst + '，且类型必须为' + typeof dst;
					break;
				case '!=':
					msg = '必须不等于' + dst;
					break;
				case '!==':
					msg = '必须不等于' + dst;
					break;
				case '>':
					msg = '必须大于' + dst;
					break;
				case '>=':
					msg = '必须大于或等于' + dst;
					break;
				case '<':
					msg = '必须小于' + dst;
					break;
				case '<=':
					msg = '必须小于或等于' + dst;
					break;
				default:
					throw new Error('未知的比较操作符：' + operator);
			}
		}
		if(!this.compareValues(operator, type, value, compareValue)) {
			return [label + msg];
		}
	};
	/**
	 * 验证是否为整数
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule     type    default     desc
	 *                   ---------------------------------------------
	 *                   min      int                 最小值
	 *                   max      int                 最大值
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static integer(validation, field, value, option, label, ruleOptMsg) {
		let msg = ruleOptMsg._ || '必须是整数';
		let errors = [];
		let val = String(value);
		if (!validator.isInt(val)) return label + msg;

		let min = option.min, max = option.max;
		let minMsg = _.template(label + (ruleOptMsg.min || '必须不小于{min}'));
		let maxMsg = _.template(label + (ruleOptMsg.max || '必须不大于{max}'));

		let msgData = {max: max, min: min};

		if (value < min) errors.push(minMsg(msgData));
		if (value > max) errors.push(maxMsg(msgData));
		return errors;
	};
	/**
	 * 验证是否为有效的用户名
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule            type   default     desc
	 *                   ---------------------------------------------
	 *                   forbiddenWords  array               不允许使用的词语
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static username(validation, field, value, option, label, ruleOptMsg) {
		let errors = [];
		let msg = _.template(label + '不能包含{forbiddenWord}');

		let forbiddenWords = ruleOptMsg.forbiddenWords || [];
		if(_.isArray(forbiddenWords)) {
			_.each(forbiddenWords, forbiddenWord => {
				if(value.indexOf(forbiddenWord) >= 0) {
					errors.push(msg({forbiddenWord: forbiddenWord}));
				}
			});
		}
		return errors;
	};
	/**
	 * 验证是否为数字
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule     type    default     desc
	 *                   ---------------------------------------------
	 *                   min      float               最小值
	 *                   max      float               最大值
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static float(validation, field, value, option, label, ruleOptMsg) {
		let msg = ruleOptMsg._ || '必须是数字';
		let errors = [];
		let val = Number(value);
		if (!_.isNumber(val)) return label + msg;

		let min = option.min, max = option.max;
		let minMsg = _.template(label + (ruleOptMsg.min || '必须不小于{min}'));
		let maxMsg = _.template(label + (ruleOptMsg.max || '必须不大于{max}'));

		let msgData = {min: min, max: max};
		if (value < min) errors.push(minMsg(msgData));
		if (value > max) errors.push(maxMsg(msgData));
		return errors;
	};
	/**
	 * 验证是否为有效的JSON数据
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule     type    default     desc
	 *                   ---------------------------------------------
	 *                   type     string  object      json类型，可以为object或array
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static json(validation, field, value, option, label, ruleOptMsg) {
		let type = option.type || 'object';
		if (!_.contains(['array', 'object'], type)) throw new Error('JSON类型只能为array或object');

		if (!_.isString(value)) return [label + '必须是字符串'];
		let obj, msg = label + '不是有效的JSON格式';
		try {
			obj = JSON.parse(value);
		} catch (error) {
			return [msg];
		}
		if (type === 'array') {
			if (!_.isArray(obj)) return [label + '不是有效的JSON数组格式'];
		}
	};
	/**
	 * 验证是否为有效的URL
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static url(validation, field, value, option, label, ruleOptMsg) {
		if (!_.isString(value)) return [label + '必须是字符串'];
		if (!validator.isURL(value)) return [label + '不是有效的URL格式'];
	};

	static _remote(method, validation, field, value, option) {
		let modelName = validation.modelName;

		let data = {
			modelName: modelName,
			data: {}
		};
		data.data[field] = value;
		return axios({
			method: 'POST',
			url: config.api.url + '/validation',
			data: data,
			headers: {
				rejectUnauthorized: false
			},
		})
		.then(response => {
			//console.log(response);
			return this._handleResponse(response);
		});
	};
	static _handleResponse(response) {
		const statusCode = response.status;
		const contentType = response.headers['content-type'];
		let error;
		if (statusCode !== 200) {
			throw new Error(`请求失败，状态码: ${statusCode}`);
		} else if (!/^application\/json/.test(contentType)) {
			throw new Error(`无效的content-type：期望 application/json 但获取的是 ${contentType}`);
		}
		return response.data;
	};
	/**
	 * 检查值在表中是否存在
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule            type    default     desc
	 *                   ---------------------------------------------
	 *                   targetClass     string              目标类（不指定则使用当前类）
	 *                   targetAttribute string              目标字段（不指定则使用当前字段）
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static exist(validation, field, value, option, label, ruleOptMsg) {
		if(this.isEmpty(value)) return [];
		return this._remote('exist', validation, field, value, option);
	};
	/**
	 * 检验值是否为有效的图片文件
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule         type    default     desc
	 *                   ---------------------------------------------
	 *                   minWidth     int                 最小宽度
	 *                   maxWidth     int                 最大宽度
	 *                   minHeight    int                 最小高度
	 *                   maxHeight    int                 最大高度
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static image(validation, field, value, option, label, ruleOptMsg) {
		if(this.isEmpty(value)) return [];
		return this._remote('image', validation, field, value, option);
	};
	/**
	 * 检查文件是否存在，以及后缀名、大小
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule                     type    default     desc
	 *                   --------------------------------------------------
	 *                   extensions               string            后缀名，如img, jpg
	 *                   checkExtensionByMimeType bool    true      是否用MME类型来检测后缀名
	 *                   mimeTypes                string            MIME类型，如"text/plain, image/png"
	 *                   minSize                  int               最小文件大小
	 *                   maxSize                  int               最大文件大小
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static file(validation, field, value, option, label, ruleOptMsg) {
		if(this.isEmpty(value)) return [];
		return this._remote('file', validation, field, value, option);
	};
	/**
	 * 检查值是否唯一，当field为多字段时，检查多个字段的组合是否唯一
	 * @param validation    validation实例
	 * @param field         模型字段
	 * @param value         字段值
	 * @param option        验证选项
	 *                   rule         type    default     desc
	 *                   ---------------------------------------------
	 *                   targetClass     string              目标类（不指定则使用当前类）
	 *                   targetAttribute string              目标字段（不指定则使用当前字段）
	 * @param label         字段说明
	 * @param ruleOptMsg    自定义错误消息  {_: defaultMsg, opt1: msg1, ...}
	 * @returns Array
	 */
	static unique(validation, field, value, option, label, ruleOptMsg) {
		if(this.isEmpty(value)) return [];
		return this._remote('unique', validation, field, value, option);
	};
};
/** 后端验证接口地址
 /*                  为空则从配置文件中加载，用于api接口服务；
 /*                  对于前端需要指定，如http://api.taoquanw.com/v1/validation
 */
module.exports = ModelValidator;