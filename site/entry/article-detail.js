/**
 * 文章资讯
 */
import "quill/dist/quill.snow.css"
import "asset/style/article-detail.less"

import Vue from "vue"
import axios from "axios"
import httpRequest from "library/http-request"

// 文章详情
//import TqComment from "widget/comment.vue"              //引人组件评论  
// import TqEmoticon from "widget/emoticon.vue"             //引人组件表情包  
 
// 公共通信组件
import { vmhtml } from "widget/bus.js"

// 注册一个全局自定义指令 v-focus
// Vue.directive('focus', {
//   // 当绑定元素插入到 DOM 中。
//     update: function (el,binding) {
//         // 聚焦元素;
//         if(binding.value==true && el.value.length>0){
            
//             el.focus();
//         }    
//     }
// });

//文章详情
// var vm=new Vue({
//     el: '#c-detail-content',
//     created:function () {
//     },
//     mounted: function () {

//     },
//     data: {
//         //评论列表配置信息
//         commentLimit:5,               //设置评论显示条数 [默认：5，非必选]
//         requestAddress:"http://127.0.0.1:9093/comment",
//     },
//     components: {TqComment},    //vue组件注入
//     computed:{
              
//     },
//     methods: {

//     }
// })

$(function () {
    loadImage();
    
    //图片预加载
    function loadImage() {
        var imgs=[];
        var $image=$(".c-detail-content").find("img");
        for (var i = 0; i < $image.length; i++) {
            var img = new Image(); //创建一个Image对象，实现图片的预下载 
                img.src = $image.eq(i).attr("src");
                imgs.push($image.eq(i).attr("src"));
                
            if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
                callback(imgs,$image);
                return; // 直接返回，不用再处理onload事件 
            }
            img.onload = function() { //图片下载完毕时异步调用callback函数。

                callback(imgs,$image); //将回调函数的this替换为Image对象 
            };
         }
        $image.attr("src","http://www.missyuan.net/uploads/allimg/150416/15201461Y-3.jpg");
    };

    function callback(imgs,$image) {
        
        for (var i = 0; i < imgs.length; i++) {
            
            $image.eq(i).attr("src",imgs[i])
        }
    }
})
