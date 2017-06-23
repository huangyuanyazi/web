/**
 * Created by henry on 2017/3/15 0015.
 */
"use strict";

module.exports.rules = {
	article_category_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'ArticleCategory', targetAttribute: 'id'}
	},
	title: {
		required: {},
		string: {max: 100},
	},
	keywords: {
		required: {},
		json: {
			pattern: [{
				rules: {
					string: {min: 1}
				}
			}]
		}
	},
	content: {
		required: {}
	},
	hits: {
		integer: {min: 0, max: 2147483647},
	},
	order: {
		integer: {min: 0, max: 2147483647},
	},
	created_by: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Admin', targetAttribute: 'id'}
	},
	updated_by: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'Admin', targetAttribute: 'id'}
	},
	created_at: {
		integer: {min: 0, max: 2147483647},
	},
	updated_at: {
		integer: {min: 0, max: 2147483647},
	},
	source: {
		string: {max: 256},
		url: {}
	},
};