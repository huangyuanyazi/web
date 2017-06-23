/**
 * 专利列表商品
 */
// import "widget/pagination/style.less"
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
	el: "#trademark-index",
	components: {TqSearch,TqGotop},    //vue组件注入
	data:{
        //搜索框配置参数
        action:"http://api.tqtest.com/v1/items",    //表单提交地址
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
    var website=decodeURI(window.location.href);

    var tree={};

    var page=1;
    var pageSize=12;
    // var total="";
    // var pageCount=1;
    var pageCount=1;
    var pageCurrent=1;
    onFilterList();
    
    //获取url中"?"符后的字串  
    function getRequest() {  
        //var url = decodeURI(window.location.search); 
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

    // 根据url查询地址，显示筛选项
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

    getTrademarkClassesTree();
    
    loadBeforeAndAfter();
    scrollFooterLoad();

    // 滚动条下拉到底部时加载数据
    function scrollFooterLoad() {
        $(window).scroll(()=>{  
            var wScrollY = window.scrollY; // 当前滚动条位置    
            var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）    
            var bScrollH = document.body.scrollHeight; // 滚动条总高度        
            if (wScrollY + wInnerH >= bScrollH) { 
                if(pageCurrent<=pageCount){           
                    onloadMoreList();
                }else{
                    $("#item-main").find(".c-item-loading").show().children("p").text("没有更多内容了！！！");
                    setTimeout(function () {
                        $("#item-main").find(".c-item-loading").hide()
                    },200);
                }
            }   
        });
    }

    // 异步获取数据
    function onloadMoreList() {
        var serachObj=getRequest();
        if(!serachObj.item_class_id){
            serachObj.item_class_id_1=2;
        }
        serachObj.page=++page;
        serachObj["per-page"]=pageSize;

        axios.get('http://api.tqtest.com/v1/items',{
            params:serachObj
        }).then(response=> {
            pageCount=response.headers['x-pagination-page-count'];
            pageCurrent=response.headers['x-pagination-current-page'];
            console.log(response.headers)
            if(pageCurrent<=pageCount){

                appendHtml(response.data)
            }
        });
        
    }
    
    function loadBeforeAndAfter() {
        // 添加请求拦截器
        axios.interceptors.request.use(config=> {
            // 在发送请求之前做些什么
            $("#item-main").find(".c-item-loading").show().children("p").text("正在加载中。。。");
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        axios.interceptors.response.use(response=> {
            // 对响应数据做点什么
            $("#item-main").find(".c-item-loading").hide();
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    
    // 拼接字符串 插入页面中
    function appendHtml(obj) {
        var $itemMainBox=$("#item-main");
        var html="";
        for (var i = 0; i < obj.length; i++) {
            var name=valueIDQueryName(obj[i].item_class_id,tree);
            html += '<li>'+
                        '<div class="c-item-picture">'+
                            '<a href="/trademark/'+obj[i].id+'">'+
                                '<img src="http://static.taoquanw.com/upload/shop/common/05337302323403315_240.png"/>'+
                            '</a>'+
                        '</div>'+
                        '<div class="c-item-text">'+
                            '<h5><a href="/trademark/'+obj[i].id+'">'+obj[i].name+'</a></h5>'+
                            '<p>'+name+'</p>'+
                            '<p class="c-item-price">&yen;'+obj[i].price+'</p>'+
                            '<p class="c-item-info">'+obj[i].description+'核准商品：服装,婴儿全套衣,摔跤服,足球鞋,高统靴,风帽(服装),袜,手套(服装),领带,皮带(服饰用)</p>'+
                        '</div>'+
                    '</li>'
        }
        
        $itemMainBox.find("ul").append(html);
    }

    // 根据item_class_id获取parent 分类名
    function valueIDQueryName(key,jsonStr) {
        let obj = jsonStr
        let name="";

             // console.log(jsonStr)
             // console.log(key)
            for (var i = 0; i < obj.length; i++) {
                if(!key||obj[i].id!=key){
                    name="全部";
                }else{
                    name=obj[i].name
                    break;
                }
            }
            return name
    }
    // 商标分类名称
    function getTrademarkClassesTree() {
        axios.get("http://api.tqtest.com/v1/item-classes",{
            params: {
                parent_id:2,  //parent_id 专利1 商标2
                fields:"id,name",
                limit:100,
            }
        }).then(response=> {
            tree=response.data
        });
    }
    
})