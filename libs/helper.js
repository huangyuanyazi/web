/**
 * Created by henry on 2017/5/10 0010.
 */
"use strict";

const _ = require('underscore');
const path = require('path');
const fs = require('fs');

let helper = class {
	/**
	 * 深度合并
	 * @param dst   目标对象
	 * @param src   追加对象
	 * @returns {*} 合并后的对象
	 */
	static deepExtend(dst, src) {
		_.each(src, (v, k) => {
			if(!dst[k]) {
				dst[k] = v;
			} else {
				if (_.isObject(v) && !_.isArray(v)) {
					dst[k] = this.deepExtend(dst[k], v);
				} else {
					dst[k] = src[k];
				}
			}
		});
		return dst;
	};

	/**
	 * 深度拷贝
	 * @param src   源对象
	 * @return 拷贝对象
	 */
	static deepClone(src) {
		return JSON.parse(JSON.stringify(src))
	};

	/**
	 * 递归创建目录
	 * @param dirName
	 * @param mode
	 * @return {boolean}
	 */
	static mkdirsSync(dirName, mode) {
		//console.log(dirName);
		if (fs.existsSync(dirName)) {
			return true;
		} else {
			if (this.mkdirsSync(path.dirname(dirName))) {
				fs.mkdirSync(dirName);
				return true;
			}
		}
	};

	static cacheModuleRules(modelDir, redisClient) {
		fs.readdir(modelDir, (err,files) => {
			if(err){
				console.error(err);
				return;
			}
			files.forEach((filename) => {
				let filePath = path.join(modelDir,filename);
				fs.stat(filePath, (err, stats) => {
					if (err) throw err;
					if(stats.isFile()){
						try {
							let model = require(filePath);
							let lastDotIndex = filename.lastIndexOf(".");
							let filenameNoExt = filename.substring(0, lastDotIndex);
							redisClient.set('model-rule:'+filenameNoExt, JSON.stringify(model.rules));
						} catch (err) {
							console.error(err);
						}
					}
				});
			});
		});
	};

};

module.exports = helper;