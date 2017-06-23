/**
 * Created by Wangxy on 2017/6/15.
 */
'use strict'

let router = require('express').Router()

router.get('/', function(request, response, next) {
    response.render('index')
})

router.route('/login')
    .get(function(request, response, next) {
        response.render('login', {title: '欢迎使用'})
    })
    .post(function(request, response, next) {
        let identity = request.body.identity
        let password = request.body.password
        request.http().post('/login', {
            identity: identity,
            password: password
        }).then(loginRes => {
            response.json(loginRes.data)
        }).catch(loginErr => {
            response.status(loginErr.response.status)
            response.json(loginErr.response.data)
        })
    })

router.get('logout', function(request, response, next) {
    response.redirect('login')
})

module.exports = router