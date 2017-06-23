/**
 * Created by Wangxy on 2017/6/13.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import cookie from 'cookie'
import httpRequest from 'library/http-request'
import routes from '../page/index/route'

import TqLayout from '../page/index/layout.vue'
import TqForm from 'widget/form.vue'
import TqFormItem from 'widget/form-item.vue'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import 'asset/style/index.less'

//注入插件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http = httpRequest

Vue.prototype.$loginUser = JSON.parse(cookie.parse(document.cookie).user)

//注册组件
Vue.component('tq-form', TqForm)
Vue.component('tq-form-item', TqFormItem)

//定义过滤器
Vue.filter('dateFormat', value => moment(value * 1000).format('YYYY-MM-DD HH:mm'))

let router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
    if ('/' === to.path)
        next('/patent-index')
    else
        next()
})

//实例化Vue
const vm = new Vue({
    el: '#placeholder',
    router,
    template: "<tq-layout/>",
    components: { TqLayout }
})