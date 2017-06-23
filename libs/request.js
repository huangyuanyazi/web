/**
 * Created by henry on 2017/5/11 0011.
 */
"use strict";

const _ = require('underscore');
const pluralize = require('pluralize');
const ipaddr = require('ipaddr.js');

const UNKNOWN_RANGE = 'unknown';

module.exports = class {
	/**
	 * 将中划线连词id解析为首字母大写的类名，id结尾的复数去掉
	 * @param id         ex. item-classes
	 * @return {string}     ex. ItemClass
	 */
	static idToClassName(id) {
		let singular = pluralize.singular(id);
		return _.map(singular.split('-'), (str) => {
			return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
		}).join('');
	};

	/**
	 * 获取根域名，可以用于cookie path，session path等
	 * @param hostname      ex. api.domain.com返回domain.com
	 */
	static getRootDomain(hostname) {
		let arr = hostname.split('.');
		arr[0] = '';
		return arr.join('.');
	};
	/**
	 * 解析UA类型
	 * @param req
	 * @return object
	 */
	static getUaVersions(req){
		let u = req.headers['user-agent'];
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') === -1, //是否web应用程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信
			qq: u.match(/\sQQ/i) === " qq", //是否QQ,
			iosApp: !!u.match(/Cordova\n iOS/),
			androidApp: !!u.match(/Cordova\n Android/)
		};
	};
	static getUaType(req) {
		let ver = this.getUaVersions(req);
		if(ver.mobile || ver.ios || ver.android ||
			ver.iPhone || ver.iPad || ver.weixin)
			return 'wap';
		else if(ver.iosApp || ver.androidApp) return 'app';
		else return 'auth';
	};
	static getPrivateDomain(req, whitelist) {
		if(whitelist) {
			let ip = req.ip;
			if(ipaddr.IPv6.isValid(ip)) {
				ip = ipaddr.fromByteArray(_.last(ipaddr.parse(ip).toByteArray(), 4)).toString();
			}
			if(ipaddr.IPv4.isValid(ip)) {
				return ipaddr.subnetMatch(ipaddr.parse(ip.toString()), whitelist, UNKNOWN_RANGE);
			}
		} else {
			return UNKNOWN_RANGE;
		}
	}
};