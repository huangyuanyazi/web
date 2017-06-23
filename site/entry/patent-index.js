/**
 * 专利列表商品
 */
import "widget/pagination/style.less"
import "asset/style/item-index.less"

import Vue from "vue"
import axios from "axios"
import httpRequest from "library/http-request"

// 公共通信组件
import { vmhtml } from "widget/bus.js"

//vue组件
import TqSearch from "widget/search.vue"                    //搜索框  
import TqGotop from "widget/gotop.vue"						//gotop	

let vm= new Vue({
	el: "#patent-index",
	components: {TqSearch,TqGotop},    //vue组件注入
	data:{
        //搜索框配置参数
        action:"http://api.tqtest.com/v1/items",     //搜索框搜索提交地址
        actionList:"http://api.tqtest.com/v1/item-classes",  //搜素框下方列表地址
        searchAddress:"http://site.tqtest.com",      //跳转地址

        isNeedBox:false,                             //显示搜索列表框
        isNeedHot:true,                             //显示搜索框下hot推荐
        isNeedNew:false,                             //显示搜索框new默认列表
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
	},
    created:function () {
    },
	methods: {
        
    }
})

$(function () {
        axios.get("http://api.tqtest.com/v1/items",{
            params: {
                item_class_id:"[3,10]",
            }
        }).then(response=> {
            console.log(response.data)
            
        });


    var website=decodeURI(window.location.href);

    if(website.indexOf("_page")!=-1){
        var start=website.indexOf("&_page=");
        website=website.slice(0,start)
        console.log(website)
    }
    onFilterList();
    
    function getRequest() {  
        //var url = decodeURI(window.location.search); //获取url中"?"符后的字串  
        var url=website.split("?")[1];
        var theRequest = {};
        if (url) {  
            // var str = url.substr(1);  
            var strs = url.split("&");  
            for(var i = 0; i < strs.length; i ++) {  
                theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }  
        }  
        return theRequest;  
    }  
    function onFilterList() {
        //var website=decodeURI(window.location.href);
        var search=getRequest();
        
        var $filterList=$("#item-filter").find(".c-item-content").find("a");
        var newWebsite;

        $filterList.each(function() {
            var querykey=$(this).data("querykey");
            var queryvalue=$(this).data("queryvalue");
            
            if(queryvalue instanceof Array){
                queryvalue="["+queryvalue+"]";
            }
            //查询字符串querykey
            if(querykey){
                //页面网址search部分url //search部分url是否存在querykey
                if(website.indexOf("?")!=-1 && website.indexOf(querykey)!=-1){

                    if(search[querykey]==queryvalue){
                        $(this).css("color","red");
                        $(this).removeAttr("href");
                        var text=$(this).text();
                        var replaceText=querykey+"="+search[querykey];
                        
                        addHtml(text,replaceText);
                    }else{
                        var replaceText=querykey+"="+search[querykey];
                        var queryText=querykey+"="+queryvalue;
                            newWebsite=website.replace(replaceText,queryText);  
                            
                        $(this).attr("href",newWebsite);
                    }
                }else{
                    if(website.indexOf("?")==-1){
                        $(this).attr("href",website+"?"+querykey+"="+queryvalue);
                    }else{
                        $(this).attr("href",website+"&"+querykey+"="+queryvalue);
                    }
                }
            }else{
                //获取同辈的查询querykey
                var siblingsQueryKey=$(this).next().data("querykey");
                var src=notQueryKey(siblingsQueryKey);
                $(this).attr("href",src);
            }
        });
    }
    //querykey不存在时link
    function notQueryKey(queryKey) {
        // var link=decodeURI(window.location.href);
        var link=website;
        var replaceText;
        if(link.indexOf("?")!=-1){
            var search=getRequest();
            var searchSrc=link.split("?")[1].split("&");
            
            if(searchSrc.length==1){
                replaceText="?"+queryKey+"="+search[queryKey];
                link=link.replace(replaceText,"");
            }else{
                if(searchSrc[0].indexOf(queryKey)!=-1){
                    replaceText=queryKey+"="+search[queryKey]+"&";
                    link=link.replace(replaceText,"");
                }else{
                    replaceText="&"+queryKey+"="+search[queryKey];
                    link=link.replace(replaceText,"");
                }
            }
        }
        return link
    }
    // 添加导航html
    function addHtml(text,replaceText) {
        // var link=decodeURI(window.location.href);
        var link=website;
        var src=link.split("?")[0]+"?"+replaceText;
        var closeSrc;
        var searchSrc=link.split("?")[1].split("&");
        if(searchSrc.length==1){
            closeSrc=link.replace("?"+replaceText,"");
        }else{
            if(searchSrc[0]==replaceText){
                closeSrc=link.replace(replaceText+"&","");
            }else{
                closeSrc=link.replace("&"+replaceText,"");
            }
        }
        var html= '<li class="c-crumbsNav-list c-crumbsNav-append">'+
                    '<a href="'+src+'">'+text+'</a>'+
                    '<a class="c-crumbsNav-close" href="'+closeSrc+'">×</a>'+
                '</li>'
        $("#item-filter").find(".c-crumbsNav").append(html);
        
    }
})
