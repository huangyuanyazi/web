/**
 * 管理中心
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import cookie from 'cookie'
import httpRequest from 'library/http-request'
import routes from '../page/route'

import TqLayout from '../page/layout.vue'
import TqForm from 'widget/form.vue'
import TqFormItem from 'widget/form-item.vue'
import TqEditor from 'widget/editor.vue'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import 'quill/dist/quill.snow.css'
import 'asset/style/index.less'

let accessToken = cookie.parse(document.cookie)['access-token']
if (!accessToken)
    location.href = '/login'

//注入插件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http = httpRequest

//注册组件
Vue.component('tq-form', TqForm)
Vue.component('tq-form-item', TqFormItem)
Vue.component('tq-editor', TqEditor)

//定义过滤器
Vue.filter('dateFormat', value => moment(value * 1000).format('YYYY-MM-DD HH:mm'))

let router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
    if ('/error' !== to.path) {
        //console.log(to)
        //next({ path: '/error' })
        next()
    } else {
        next()
    }
})

//实例化Vue
const vm = new Vue({
    el: '#placeholder',
    router,
    template: '<tq-layout/>',
    components: { TqLayout }
})