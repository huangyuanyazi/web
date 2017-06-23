/**
 * 文章资讯
 */
import "quill/dist/quill.snow.css"
import "asset/style/article-index.less"
import "../widget/pagination/style.less"

import Vue from "vue"
import axios from "axios"
import httpRequest from "library/http-request"

// 文章列表
// import TqArticle from "widget/articles.vue"  				//引人组件文章列表
import TqBanner from "widget/banners.vue"					//引人组件轮播图
import TqGotop from "widget/gotop.vue"                   //引人组件gotop
//import TqPage from "widget/pages.vue"						//引人组件分页

// 文章详情
//import TqComment from "widget/comment.vue"				//引人组件评论  
// import TqEmoticon from "widget/emoticon.vue"				//引人组件表情包  
 
// 公共通信组件
import { vmhtml } from "widget/bus.js"

// import  Pagination from "widget/pagination/index.js"

//注册组件
//Vue.component("tq-article", TqArticle)
//Vue.component("tq-comment", TqComment)
//Vue.component("tq-emoticon", TqEmoticon)
// Vue.use(Pagination)
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
    update: function (el,binding) {
        // 聚焦元素;
        if(binding.value==true && el.value.length>0){
        	
            el.focus();
        }    
    }
});

//文章内容
var vm = new Vue({
    el: '#c-content',
    created:function () {
        //请求轮播图数据
        httpRequest.get(config.mock.url + "/banners").then(response => {
            
            var data=response.data;
           
            this.loadImage(data)
            
        });
       
    },
    mounted: function () {

    },
    computed:{
              
    },
    data: {
        //轮播图配置信息
        autoPlayTime:5000,                          //自动播放时间[默认：5000，非必选]
        isMsgUse:true,                              //开启文本信息[默认：true，非必选]
        isArrowUse:true,                            //开启左右箭头[默认：true，非必选]
        isSwitchUse:true,                           //开启选择按钮[默认：true，非必选]
        imgHover:true,                              //开启img hover效果[默认：false，非必选]
        imgSrcs:[],
        //轮播图数据
        slideLists: [],                             
                                         
        // 分页配置信息
        //pageSize:10,                                //设置一页显示多少文章列表[默认：10，非必选]
        //showPageNumber:5,                           //显示页码[5,10,15,20][默认：5，非必选]
    },
    components: {TqBanner,TqGotop},    //vue组件注入
    
    methods: {
        // 图片预加载
        loadImage:function (data) {
            var imgsrc="http://www.missyuan.net/uploads/allimg/150416/15201461Y-3.jpg"; 

            this.imgSrcs=[];  

            for (var i = 0; i < data.length; i++) {
                var img = new Image(); //创建一个Image对象，实现图片的预下载 
                img.src = data[i].image;

                this.imgSrcs.push(data[i].image);

                this.slideLists.push(data[i]);

                data[i].image=imgsrc;

                if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
                    
                    this.repleImg(data); 
                    return; 
                }    
                img.onload=()=> { //图片下载完毕时异步调用callback函数。
                    
                    this.repleImg(data);
                }
            }
            
        },
        // 替换加载完图片
        repleImg:function (data) {

            this.slideLists=[];
                
            for (var i = 0; i < data.length; i++) {

                data[i].image=this.imgSrcs[i]
                this.slideLists.push(data[i]);
            }
           
        },
    }
});
var vm2 = new Vue({
    el: '#c-side',
    created:function () {
        //请求轮播图数据
        httpRequest.get(config.mock.url + "/banners").then(response => {
            
            var data=response.data;
           
            this.loadImage(data)
            
        });
       
    },
    mounted: function () {

    },
    computed:{
              
    },
    data: {
        //轮播图配置信息
        autoPlayTime:5000,                          //自动播放时间[默认：5000，非必选]
        isMsgUse:false,                              //开启文本信息[默认：true，非必选]
        isArrowUse:false,                            //开启左右箭头[默认：true，非必选]
        isSwitchUse:true,                           //开启选择按钮[默认：true，非必选]
        //imgHover:false,                              //开启img hover效果[默认：false，非必选]
        isSwitchStyle:true,                         //选择按钮改变样式
        imgSrcs:[],
        //轮播图数据
        slideLists: [],   
    },
    components: {TqBanner},    //vue组件注入
    
    methods: {
        // 图片预加载
        loadImage:function (data) {
            var imgsrc="http://www.missyuan.net/uploads/allimg/150416/15201461Y-3.jpg"; 

            this.imgSrcs=[];  

            for (var i = 0; i < data.length; i++) {
                var img = new Image(); //创建一个Image对象，实现图片的预下载 
                img.src = data[i].image;

                this.imgSrcs.push(data[i].image);

                this.slideLists.push(data[i]);

                data[i].image=imgsrc;

                if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
                    
                    this.repleImg(data); 
                    return; 
                }    
                img.onload=()=> { //图片下载完毕时异步调用callback函数。
                    
                    this.repleImg(data);
                }
            }
            
        },
        // 替换加载完图片
        repleImg:function (data) {

            this.slideLists=[];
                
            for (var i = 0; i < data.length; i++) {

                data[i].image=this.imgSrcs[i]
                this.slideLists.push(data[i]);
            }
           
        },
    }
});
//文章列表
$(function () {
    onSwitchNav();

    //切换文章列表
    function onSwitchNav() {
        var search=location.href.split("?")[1]
        var $news=$("#c-news");
        if(search){
            $news.find(".c-article-nav").each(function() {
                var link=$(this).attr("href").split("?")[1];
                if(link && search.indexOf(link)!=-1){
                    $(this).addClass("active").siblings().removeClass("active");
                    //break;
                    return false;
                }else{
                    $news.find(".c-article-nav").removeClass("active").eq(0).addClass("active");
                }
                
            });
        }else{
            $news.find(".c-article-nav").removeClass("active").eq(0).addClass("active");
        }
    }
    
});