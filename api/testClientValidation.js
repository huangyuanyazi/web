/**
 * Created by henry on 2017/4/12 0012.
 */
"use strict";

const _ = require('underscore');
_.templateSettings = {
	interpolate: /\{(.+?)\}/g
};
const config = require('../libs/config').get();
const v = require('../libs/validation');
const axios = require('axios');
axios({
	method: 'GET',
	url: 'http://api.tq.com/v1/admins',
	data: [],
	headers: [],
	params: []
}).then(response => {
	//console.log(response);
	console.log(response);
}).catch(err => {
	console.error(err);
});
let allModelData = {
	Article: {
		article_category_id: 111,
		title: '',
		keywords: '',
		content: '',
		hits: 0,
		order: 0,
		created_by: 111,
		updated_by: 111,
		created_at: 111,
		updated_at: 111,
		source: 111,
	},
	ArticleCategory: {
		name: 'sss',
		code: '',
		parent_id: 111,
		order: 0,
		template_path: '',
		image_path: ''
	}
};

let validateAll = async () => {
	for(let modelName in allModelData) {
		let modelData = allModelData[modelName];
		console.log('--------------'+modelName+'------------------');
		let va = new v(modelName, modelData);
		for(let field in modelData) {
			console.log(field);
			try {
				let result = await va.validateField(field, field);
				if(_.isEmpty(result)) console.log('\t[result] -> True');
				else console.log('\t[result] -> ', JSON.stringify(result));
			} catch (error) {
				console.error('\t[error] -> ', error);
			}
		}
	}

};

validateAll();