/**
 * Created by henry on 2017/3/13 0013.
 */
"use strict";

delete require.cache[__filename];   //否则UserCommon全局共享，导致下面的更改会影响其它Model
let userCommon = require('./UserCommon');

userCommon.rules.username.unique = {targetClass: 'Admin'};
userCommon.rules.email.required = {};
userCommon.rules.email.unique = {targetClass: 'Admin'};
userCommon.rules.mobile.unique = {targetClass: 'Admin'};

module.exports.rules = userCommon.rules;