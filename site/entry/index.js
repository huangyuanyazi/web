/**
 * 网站首页
 */
console.log("本站由淘权网技术部开发^_^\n\n想来淘权工作？请发送简历到：hr@taoquanw.com（并注明来自console）")
import "asset/style/index.less"

import Vue from "vue"

import axios from "axios"

import TqBanner from "widget/banners.vue"					//引人组件轮播图
import TqSearch from "widget/search.vue"                    //引人搜索框  
//import TqLogin from "widget/login.vue"                    //引人搜索框  
import TqGotop from "widget/gotop.vue" 
// 公共通信组件
import { vmhtml } from "widget/bus.js"

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
    update: function (el,binding) {
        // 聚焦元素;
        if(binding.value==true && el.value.length>=0){
            el.focus();
        }    
    }
});

let vm= new Vue({
	el: "#main",
	data:{
		//轮播图配置信息
        autoPlayTime:5000,                          //自动播放时间[默认：5000，非必选]
        isMsgUse:false,                              //开启文本信息[默认：true，非必选]
        isArrowUse:false,                            //开启左右箭头[默认：true，非必选]
        isSwitchUse:true,                           //开启选择按钮[默认：true，非必选]
        imgHover:false,                             //图片hover效果[默认：false，非必选]
        slideLists: [                               //轮播图图片参数[默认：无，必选]
            {                                   
                "clickUrl": "#",
                "desc": "nhwc",
                "image": "http://dummyimage.com/1745x492/f1d65b"
            }, {
                "clickUrl": "#",
                "desc": "hxrj",
                "image": "http://dummyimage.com/1745x492/40b7ea"
            },{
                "clickUrl": "#",
                "desc": "rsdh",
                "image": "http://img2.cache.netease.com/media/2016/6/18/20160618231436dd785.jpg"
            }
        ],

        //搜索框配置参数
        action:"http://api.tqtest.com/v1/items",    //表单提交地址
        actionList:"http://api.tqtest.com/v1/item-classes",  //搜素框下方列表地址
        searchAddress:"http://site.tqtest.com",      //跳转地址
        isNeedBox:true,                             //显示搜索列表框
        isNeedHot:true,                             //显示搜索框下hot推荐
        isNeedNew:true,                             //显示搜索框new默认列表
        optList :[                                  //搜索框说明
            {
                name:"专利",
                val:"patent",
                placeholder:"从9999个专利中查找",
            },
            {
                name:"商标",
                val:"trademark",
                placeholder:"从8888个商标中查找",
            },
        ],
        //登录
        //提交表单地址
        // action:"http://127.0.0.1:9093/user",
        // // 条款链接地址
        // clauseAddress:"http://127.0.0.1:9093/user",
        // // 二维码请求地址
        // qrcodeAction:"http://127.0.0.1:9093/user",
        // // 短信验证码请求地址
        // msgCodeAction:"http://api.tqtest.com/v1/captcha",
        // // 图片验证码请求地址
        // imgCodeAction:"http://api.tqtest.com/v1/captcha",
	},
	components: {TqBanner,TqSearch,TqGotop},    //vue组件注入
	created:function () {
        
    },
    methods: {
    }
})
$(function () {
    //文章资讯列表切换
    var $c_news=$("#c-news");
        $c_news.find(".c-news-list").eq(0).addClass('active');
        $c_news.on("click",".c-news-list",function(){
            var i=$(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $c_news.find(".c-news-item").eq(i).show().siblings().hide();
        });

    
})
