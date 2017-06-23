/**
 * Created by henry on 2017/3/13 0013.
 */
"use strict";

delete require.cache[__filename];   //否则UserCommon全局共享，导致下面的更改会影响其它Model
let userCommon = require('./UserCommon');

userCommon.rules.username.unique = {targetClass: 'User'};
userCommon.rules.email.unique = {targetClass: 'User'};
userCommon.rules.mobile.unique = {targetClass: 'User'};
module.exports.rules = userCommon.rules;