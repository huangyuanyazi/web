/**
 * Created by henry on 2017/3/14 0014.
 */
"use strict";

const _ = require('underscore');
const validator = require('./validator');

let validation = class {
	/**
	 *
	 * @param name     string|Array      要验证的模型名称，或者直接传入rule
	 * @param data      object      要验证的模型数据
	 */
	constructor(name, data=null) {
		this.modelName = name;
		if(_.isArray(name)) {
			this.rules = name;
		} else if(_.isString(name)) {
			this.rules = require('../api/models/' + name).rules;
		} else this.rules = [];
		this.data = data;
	};

	/**
	 *
	 * @returns Promise 验证成功返回空，失败返回描述
	 */
	validate() {
		let errors = {};
		let promises = [];
		_.each(this.rules, (asserts, field) => {
			_.each(asserts, (option, rule) => {
				let result;
				// 逗号分隔的表示多个字段的组合
				if (validator.isMultiField(field)) {
					result = validator[rule](this, field);
				}
				else {
					let value = this.data[field];
					if (!_.isNull(value) && !_.isUndefined(value)) {
						result = validator[rule](this, field, this.data[field], option, field, {});
					}
				}
				if (result instanceof Promise) {
					// 需要远程判断
					promises.push(result);
				} else if (!_.isEmpty(result)) {
					if (!errors[field]) errors[field] = [];
					errors[field] = errors[field].concat(result);
				}
			});
		});
		if(!_.isEmpty(errors)) return Promise.resolve(errors);
		return Promise.all(promises);
	};

	/**
	 *
	 * @param field string  字段名
	 * @param label string 字段描述
	 * @param optMsg object {integer: {min: message, max: message}, ...}
	 * @returns Promise 验证成功返回空，失败返回描述
	 */
	validateField(field, label='', optMsg={}) {
		// 先判断不需要remote的，以加快响应
		let promises = [];
		let errors = [];
		_.each(this.rules[field], (option, rule) => {
			let value = this.data[field];
			let ruleOptMsg = optMsg[rule] || {};
			let result = validator[rule](this, field, value, option, label, ruleOptMsg);
			if (result instanceof Promise) {
				// 需要远程判断
				promises.push(result);
			} else if (!validator.isEmpty(result)) {
				errors = errors.concat(result);
			}
		});
		if(!_.isEmpty(errors)) return Promise.resolve(errors);
		return Promise.all(promises);
	};
};

module.exports = validation;