/**
 * 用户中心
 */
import Vue from "vue"
import VueRouter from "vue-router"
import ElementUI from "element-ui"
import httpRequest from "library/http-request"
import routes from "../page/user/route"

import layout from "../page/user/layout.vue"

import "element-ui/lib/theme-default/index.css"
import "font-awesome/css/font-awesome.css"
import "asset/style/user.less"

//注入插件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http = httpRequest

//定义过滤器
Vue.filter("date-format", value => moment(value * 1000).format("YYYY-MM-DD HH:mm"))

//实例化Vue
const vm = new Vue({
    el: "#placeholder",
    router: new VueRouter({ routes }),
    template: "<layout/>",
    components: { layout },
    watch: {
        "$route" (to, from) {
            // console.log(to.path)
            // console.log(from.path)
        }
    }
})