/**
 * 管理员登录
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import httpRequest from 'library/http-request'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import 'asset/style/login.less'

Vue.use(ElementUI)

Vue.component('tq-error-message', {
    render: function(createElement) {
        let errorElements = []
        for (let error of this.errors) {
            errorElements.push(createElement('p', { style: { margin: '0', padding: '0'} }, error.message))
        }
        return createElement('div', { style: {padding: '0 0 10px 0', color: 'red', fontSize: '12px' }}, errorElements)
    },
    props: {
        errors: {
            type: Array,
            require: true
        }
    }
})

const vm = new Vue({
    el: '#app',
    data: {
        user: {},
        errors: []
    },
    methods: {
        login () {
            httpRequest.post(config.admin.url + '/login', {
                identity: this.user.identity,
                password: this.user.password
            }).then(loginRes => {
                //console.log(loginRes.data)
                location.href = '/'
            }).catch(loginErr => {
                this.errors = loginErr.response.data
                //console.log(loginErr.response)
            })
        }
    }
})