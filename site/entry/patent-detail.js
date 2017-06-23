/**
 * 专利商品详情
 */
import "asset/style/item-detail.less"

import Vue from "vue"
import axios from "axios"
import httpRequest from "library/http-request"
 
import TqGotop from "widget/gotop.vue"						//gotop	

// 公共通信组件
import { vmhtml } from "widget/bus.js"

let vm= new Vue({
	el: "#patent-detail",
	components: {TqGotop},    //vue组件注入
	data:{
		
	},
    created:function () {

    },
	methods: {
        
    }
});
$(function () {
	onPreviewSwitch();
	scrollFixed();

	function onPreviewSwitch() {
		var $previewBox=$("#preview-wrap");
		$previewBox.find(".c-thumbnailbox-list").on("mouseover",function () {
			var indexes=$(this).index();
			$previewBox.find(".c-preview-list").hide().eq(indexes).show();
		});
		if($previewBox.find(".c-preview-list").length>4){
			$previewBox.find(".c-preview-arrow").show();
		}
	}
	function scrollFixed() {
		var $rightBox=$("#item-right");
		var $contetnList=$rightBox.find(".c-item-contentList");
		var $submenuBox=$rightBox.find(".c-item-submenu");
		var top=$submenuBox.offset().top+$submenuBox.height();
		
		$(window).scroll(function() {
			var scrollTop=$(this).scrollTop()+$submenuBox.height();
			if(top<scrollTop){
				$submenuBox.addClass("c-submenu-fixed");
			}else{
				$submenuBox.removeClass("c-submenu-fixed");
			}
			for (let i = 0; i < $contetnList.length; i++) {
				var offsetTop=$contetnList.eq(i).offset().top
				if(offsetTop<scrollTop){
					$submenuBox.find("a").eq(i).addClass("active").siblings().removeClass("active");
				}
			}
		});
		$submenuBox.find("a").on("click",function () {
			$(this).addClass("active").siblings().removeClass("active");
		})
	}

	getBrowseLog();

	function getBrowseLog() {
		
		var c_name="browseLog";
		var value=$("#c-itemInfo-h3").text();
		var expiredays=30;
		setCookie(c_name,value,expiredays)
		
	}

	function getCookie(c_name){
		if (document.cookie.length>0){
		var c_start=document.cookie.indexOf(c_name + "=")
		  	if (c_start!=-1){ 
		    	c_start=c_start + c_name.length+1 
		    	var c_end=document.cookie.indexOf(";",c_start)
		    	if (c_end==-1){
		    		c_end=document.cookie.length
		    	}
		    		
		    	return decodeURI(document.cookie.substring(c_start,c_end))
		    } 
		}
		return ""
	}

	function setCookie(c_name,value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		console.log(getCookie(c_name))
		if(getCookie(c_name)){
			var str=getCookie(c_name);

			if(str.indexOf(","+value)==-1 && str.indexOf(value)!=0){
				
				document.cookie=c_name+ "=" +getCookie(c_name)+","+encodeURI(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
			}
			
		}else{
			document.cookie=c_name+ "=" +encodeURI(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
		}
	}

})
