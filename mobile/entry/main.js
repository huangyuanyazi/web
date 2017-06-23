/**
 * Created by john on 2017/4/11.
 */
import "framework7"

import "framework7/dist/css/framework7.ios.css"
import "framework7/dist/css/framework7.ios.colors.css"
import "font-awesome/css/font-awesome.css"
import "../asset/style/theme.less"

import actions from "../action/index"

window.$$ = Dom7

let actionExecutor = null

let myApp = new Framework7({
    pushState: true,
    pushStateSeparator: "#",
    //precompileTemplates: true,
    //template7Pages: true,
    //template7Data: {},
    preroute: function (view, options) {
        //console.log("---preroute---")
        let pageUrl = "/"
        if (options.url) {
            pageUrl = -1 == options.url.indexOf("?") ? options.url : options.url.substring(0, options.url.indexOf("?"))
        }
        actionExecutor = actions[pageUrl] ? actions[pageUrl] : null
    },
    /*
     preprocess: function (content, url, next) {
     console.log("---preprocess---")
     if(actionExecute) {
     actionExecute(function (result) {
     if(result.default.before) {
     pageObj.url = url
     result.default.before.call(pageObj, () => {
     next(content)
     })
     } else {
     next(content)
     }
     })
     } else {
     return content
     }
     },
     */
    onPageInit: function (app, page) {
        if (actionExecutor) {
            actionExecutor(function (result) {
                if (result.default.pageInit) {
                    result.default.pageInit.call(this, app, page)
                }
            })
        }
    },
    onPageBeforeAnimation: function (app, page) {
        app.showIndicator()
    },
    onPageAfterAnimation: function (app, page) {
        app.hideIndicator()
    }
})

let mainView = myApp.addView(".view-main", {
    dynamicNavbar: true
})

$$("#tab_patent").on("show", function () {
    mainView.router.loadPage("page/patent/index.html")
})

$$("#tab_trademark").on("show", function () {
    mainView.router.loadPage("page/trademark/index.html")
})
//mainView.hideNavbar()
let indexPageTemplate = Template7.compile(Dom7("#indexPageTemplate").html())
$$("#indexPageContent").html(indexPageTemplate({title: "正在加载，请稍等..."}))

$$(document).on("ajaxStart", function (e) {
    let xhr = e.detail.xhr
    xhr.withCredentials = true
})

$$(document).on('ajaxComplete', function (e) {
    var xhr = e.detail.xhr;
    // console.log(xhr);
    // alert(xhr.status + '\n' + xhr.requestUrl);
});

Template7.registerHelper('valueLabelQuery', function (jsonStr, key, metaJsonStr) {
    let obj = JSON.parse(jsonStr)
    let metaObj = JSON.parse(metaJsonStr)
    return metaObj[key]['in'] ? metaObj[key]['in'][obj[key]] : obj[key]
})

//setTimeout(mainView.router.loadPage, 1000, "page/patent/index.html")
/**
 * 深度链接插件的配置
 */
var app = {
    /**
     * 配置的构造者
     */
    initialize: function () {
        this.bindEvents();
    },

    /**
     * 绑定事件的监听者
     */
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    /**
     * 插件准备状态，在此写一些处理事件
     * 这些函数名来自于cordova配置文件中
     */
    onDeviceReady: function () {
        console.log('Handle deviceready event if you need');
        universalLinks.subscribe('openGoodsListPage', app.onGoodsListPageRequested);
        universalLinks.subscribe('openGoodsDetailedPage', app.onGoodsDetailedPageRequested);
        universalLinks.subscribe('launchedAppFromLink', app.onApplicationDidLaunchFromLink);
    },

    /**
     * ‘taoquanw://taoquanGoods.com/good/’通过此链接打开应用触发此方法
     */
    onGoodsListPageRequested: function (eventData) {
        console.log('Showing to user list of awesome goods');

    },

    /**
     * ‘taoquanw://taoquanGoods.com/good/......’通过此链接打开应用触发此方法
     */
    onGoodsDetailedPageRequested: function (eventData) {
        console.log('Showing to user details page for some goods');
    },

    /**
     * ‘taoquanw://taoquanGoods.com?query’通过此链接打开应用触发此方法
     * 取出查询参数，路由到相应详情页面
     */
    onApplicationDidLaunchFromLink: function (eventData) {
        console.log('Did launch app from the link: ' + eventData.url);
        console.log('good:' + getParameterByName(eventData.url, 'good'), 'pageId:' + getParameterByName(eventData.url, 'pageId'))
        let good = getParameterByName(eventData.url, 'good');
        let pageId = getParameterByName(eventData.url, 'pageId');
        switch (good) {
            case 'patent':
                mainView.router.loadPage(`page/patent/detail.html?id=${pageId}`)
                break;
            case 'trademark':
                mainView.router.loadPage(`page/trademark/detail.html?id=${pageId}`)
                break;
            default:
                break;

        }
    }

};

app.initialize();

function getParameterByName(url, name) {
    var match = RegExp('[?&&]' + name + '=([^&&]*)').exec(url);
    return match && match[1];
}