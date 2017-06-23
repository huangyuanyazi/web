// 回到顶部
    var $c_gotop=$("#c-gotop");
        $c_gotop.find(".c-gotop-list").on("mouseenter", function(event) {
            
            $(this).find("i").hide().siblings("span").addClass("c-show");
            if($(this).find(".c-gotop-div").length>0){
                $(this).find(".c-gotop-div").addClass("c-gotop-transition")
            }
        });
        $c_gotop.find(".c-gotop-list").on("mouseleave", function(event) {
            
            $(this).find("i").show().siblings("span").removeClass("c-show");
            if($(this).find(".c-gotop-div").length>0){
                $(this).find(".c-gotop-div").removeClass("c-gotop-transition")
            }
        });
        $(window).scroll(function() {
            var top=$(this).scrollTop()
            
            if(top>1000){
                $c_gotop.find(".c-gotop-to").css({display:"block"});
            }else{
                $c_gotop.find(".c-gotop-to").hide(); 
            }
            
        });
        $c_gotop.find(".c-gotop-to").on("click", function(event) {
            
            $(window).scrollTop(0)
           
        });