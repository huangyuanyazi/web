/**
 * Created by henry on 2017/5/11 0011.
 */
"use strict";

require('../global');

const helper = require('./helper');
const configPath = '../config/';


let config = class {
	/**
	 * 获取子应用的配置
	 * @param app       ex. api，app为空则返回公共配置
	 * @return {*}
	 */
	static get(app='') {
		let config, commonCfg = helper.deepClone(require(configPath + 'common'));
		let commonLocalCfg = require(configPath + 'common-local');
		config = helper.deepExtend(commonCfg, commonLocalCfg);
		if(app) {
			let appCfg = require(configPath + app);
			config = helper.deepExtend(config, appCfg);
			let appLocalCfg = require(configPath + app + '-local');
			config = helper.deepExtend(config, appLocalCfg);
		}
		return config;
	}
};

module.exports = config;