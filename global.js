/**
 * Created by henry on 2017/5/12 0012.
 */
"use strict";
const path = require('path');

let vars = class {
	static get ROOT_PATH() {
		return __dirname;
	};
	static get CONFIG_PATH() {
		return path.join(__dirname, 'config');
	};
	static get LIB_PATH() {
		return path.join(__dirname, 'libs');
	};
	static get API_PATH() {
		return path.join(__dirname, 'api');
	};
};

global.VARS = vars;
module.export = vars;
