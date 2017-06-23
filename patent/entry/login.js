/**
 * 专利查询登录
 * Created by Wangxy on 2017/6/13.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import httpRequest from 'library/http-request'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import 'asset/style/login.less'

Vue.use(ElementUI)

const vm = new Vue({
    el: '#app',
    data: {
        user: {},
        errors: []
    },
    methods: {
        login () {
            httpRequest.post(config.patent.url + '/login', {
                username: this.user.username,
                mobile: this.user.mobile
            }).then(loginRes => {
                location.href = '/'
            }).catch(loginErr => {
                this.errors = loginErr.response.data
            })
        }
    }
})