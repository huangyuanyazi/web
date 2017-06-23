/**
 * Created by henry on 2017/6/19 0019.
 */
"use strict";

const formidable = require('formidable');
const _ = require('underscore');
const helper = require(global.VARS.LIB_PATH + '/helper');

module.exports.model = 'CsPatent';
module.exports.beforeProxy = (req, res) => {
	if(req.method !== 'POST') return res;

	let regex = /\/excel$/;
	if(req.path.match(regex) === null) return res;

	let form = new formidable.IncomingForm();

	form.uploadDir = global.CONFIG.uploadDir;
	form.hash = 'md5';
	form.keepExtensions = true;
	form.maxFieldsSize = 32 * 1024 * 1024;

	if(!helper.mkdirsSync(form.uploadDir, 0o666)) {
		throw new Error('无法上传文件');
	}

	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			console.log(fields, files);

			let file = files.excel;
			//fs.unlinkSync(file.path);

			req.headers['content-type'] = 'application/json';
			req.body.fileInfo = {
				size: file.size,
				path: file.path,
				name: file.name,
				hash: file.hash,
				lastModifiedDate: file.lastModifiedDate.toLocaleString()
			};
			req.body.fields = fields;
			resolve(res);

			form.on('progress', (bytesReceived, bytesExpected) => {
				let percent = Math.floor(bytesReceived / bytesExpected * 100);
				console.log(percent, '%');
			});
			form.on('aborted', function () {
				reject(new Error('aborted'));
			});
			form.on('error', function (err) {
				reject(err);
			});
		});
	});
};