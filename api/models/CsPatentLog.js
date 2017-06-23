/**
 * Created by henry on 2017/6/16 0016.
 */
"use strict";

module.exports.rules =  {
	patent_id: {
		required: {},
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'CsPatent', targetAttribute: 'id'}
	},
	review_status_id: {
		integer: {min: 1, max: 2147483647},
		exist: {targetClass: 'CsReviewStatus', targetAttribute: 'id'}
	},
	date: {
		required: {},
		integer: {min: 0, max: 2147483647},
	},
	days: {
		integer: {min: 0, max: 2147483647},
	}
};