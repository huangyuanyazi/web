/**
 * Created by Wangxy on 2017/6/15.
 */
'use strict'

let router = require('express').Router()

router.get('/', function (request, response, next) {
    let data = {}
    let user = request.cookies['user']
    if (user) {
        data.user = user
        response.render('index', data)
    } else {
        response.redirect('/login')
    }
})

router.route('/login')
    .get(function (request, response, next) {
        response.render('login')
    })
    .post(function(request, response, next) {
        let username = request.body.username
        let mobile = request.body.mobile
        response.cookie('user', JSON.stringify([username, mobile]))
        response.json({ })
    })

router.route('/mobile')
    .get(function (request, response, next) {
        response.render('mobile')
    })

module.exports = router