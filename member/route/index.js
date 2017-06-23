/**
 * 用户中心
 */
'use strict'
var router = require('express').Router()

router.get('/', function(request, response, next) {
    response.render('index')
})

router.post('/login', function(request, response, next) {
    response.redirect('/')
})

router.get('/logout', function(request, response, next) {
    response.redirect('/login')
})

module.exports = router