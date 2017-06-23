/**
 * detail.js
 * 商标详情页的相关代码
 */
export default {
    pageInit (app, page) {
        Template7.registerHelper('json', function (condition, options) {
            let value = JSON.parse(condition)
            let key = options.hash.key
            switch (key) {
                case'type':
                    switch (value[options.hash.key]) {
                        case 0:
                            return "文字商标"
                            break;
                        case 1:
                            return "图形商标"
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    return value[options.hash.key]
                    break;
            }
        })
        Template7.registerHelper('jsonObj', function (condition, options) {
            let value = JSON.parse(condition);
            console.log(value)
            console.log(value instanceof Array)
            console.log(options)
            // console.log(value[0])
            return value

        })
        //获取传入的id参数
        let id = page.query.id
        //编译模板
        let trademarkDetailTemplate = Template7.compile($$("#trademarkDetailTemplate").html())
        /**
         * 根据传入的id获取相应的数据
         */
        $$.getJSON(config.api.url + "/items?id=" + id, (data, status, xhr) => {
            $$("#trademarkDetailContent").html(trademarkDetailTemplate({trademark:data}))
        })
        /**
         * 点击分享按钮弹出actionsheet,并给每个按钮设置了点击事件
         */
        $$('#trademarkDetailShare').on('click', function () {
            // var buttons = [
            //     {
            //         text: '微信',
            //         bold: true, color: "orange",
            //         onClick: function () {
            //             app.alert('您分享了微信')
            //         }
            //     },
            //     {
            //         text: '新浪',
            //         bold: true, color: "green",
            //         onClick: function () {
            //             app.alert('您分享了新浪')
            //         }
            //     },
            //     {
            //         text: 'QQ',
            //         bold: true, color: "purple",
            //         onClick: function () {
            //             app.alert('您分享了QQ')
            //         }
            //     },
            //     {
            //         text: '取消',
            //         bold: true, color: "red"
            //     },
            // ];
            // app.actions(buttons);
            /**
             *
             * @type {{message: 分享链接的描述性文字, url: 分享的链接}}
             */
            let options = {
                message: '淘权网商品详情', // not supported on some apps (Facebook, Instagram)
                // subject: 'the subject', // fi. for email
                // files: ['', ''], // an array of filenames either locally or remotely
                url: `http://mobile.tqtest.com/#page/trademark/detail.html?id=${id}`,
                // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
            }
            /**
             *调用成功的回调函数
             */
            let onSuccess = function (result) {
                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            }
            /**
             *调用失败的回调函数
             */
            let onError = function (msg) {
                console.log("Sharing failed with message: " + msg);
            }
            //触发分享方法
            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        })
        //当前页的链接地址
        let url = window.location.href
        //浏览器用于 HTTP 请求的用户代理头的值.用于判断从什么系统的浏览器打开的本页面
        let ua = navigator.userAgent.toLowerCase();
        //用于销毁timeout
        let timeoutMethod;
        /**
         * 打开app或者下载链接的一些配置文件
         * @type {{iosScheme: ios的应用打开接口, androidScheme: android的应用打开接口, timeout: 延迟时间, downloadUrl: 下载链接}}
         */
        let appOpenConfig = {
            iosScheme: 'will://',
            androidScheme: `taoquanw://taoquanwGoods.com?good=trademark&pageId=${id}`,
            timeout: 600,
            downloadUrl: 'https://www.baidu.com'
        };
        /**
         * 页面默认有‘联系客服’，‘打开应用’两个按钮，当应用打开到这个应用时隐藏打开应用按钮
         */
            //延迟的开始时间
        let startTime = Date.now();
        if (url !== `http://mobile.tqtest.com/#page/trademark/detail.html?id=${id}`) {
            $$('#trademarkOpenAppButton').hide()
        } else {
            /**
             * 打开应用按钮的点击事件
             */
            $$('#trademarkOpenAppButton').on('click', function () {
                /**
                 * 预装了本应用时打开应用
                 */
                if (ua.indexOf('os') > 0) {
                    window.location = appOpenConfig.iosScheme
                } else {
                    window.location = appOpenConfig.androidScheme
                }
                /**
                 * 没有装本应用跳转至下载
                 */
                timeoutMethod = setTimeout(function () {
                    let endTime = Date.now();

                    if (!startTime || endTime - startTime > appOpenConfig.timeout + 200) {
                        window.location = appOpenConfig.downloadUrl;
                    } else {

                    }

                }, appOpenConfig.timeout);
                /**
                 * 销毁timeout方法
                 */
                window.onblur = function () {
                    clearTimeout(timeoutMethod);
                }

            })
        }
        $$('#trademarkCustomerServiceButton').on('click', function () {
            let trademarkCustomerServiceInfo = $$('#trademarkCustomerServiceInfo').val()
            app.alert('正在为您联系' + trademarkCustomerServiceInfo)
        })

    }
}








