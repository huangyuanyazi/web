/**
 * 包装fivebeans的api为promise，以便同步调用
 * Created by henry on 2017/5/12 0012.
 */
"use strict";

let bsClient = class {
	constructor(client) {
		this.client = client;
	};
	reserve() {
		return new Promise((resolve, reject) => {
			this.client.reserve((err, jobId, payload) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						id: jobId,
						payload: payload
					})
				}
			});
		});
	};
	destroy(jobId) {
		return new Promise((resolve, reject) => {
			this.client.destroy(jobId, (err) => {
				if (!err) {
					resolve();
				} else {
					reject(err);
				}
			});
		});
	};
	bury(jobId) {
		return new Promise((resolve, reject) => {
			this.client.bury(jobId, (err) => {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};
	list_tubes() {
		return new Promise((resolve, reject) => {
			this.client.list_tubes((err, tubeName) => {
				if(err) {
					reject(err);
				} else {
					resolve(tubeName);
				}
			});
		});
	};
};

module.exports = bsClient;