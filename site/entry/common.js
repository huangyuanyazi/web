import "asset/style/common.less"

$(function () {
	var $header=$("#c-header");
	var href=window.location.pathname;
	$header.find(".c-link").children("a").each(function() {
		var link=$(this).attr("href");
		if(href && href.indexOf(link)!=-1){
			$(this).addClass("c-current").siblings().removeClass("c-current");
		}
	});
})