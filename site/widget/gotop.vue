<template>
    <div class="c-gotop" id="c-gotop" v-on:mouseover="onShowBox($event)" v-on:mouseout="onHideBox($event)">
        <a class="c-gotop-list" href="">
            <i class="c-gotop-icon icon-speech-bubble"></i>
            <span class="c-gotop-text">意见反馈</span>
        </a>
        <a class="c-gotop-list" href="">
            <i class="c-gotop-icon icon-help_outline"></i>
            <span class="c-gotop-text">常见问题</span>
        </a>
        <a class="c-gotop-list" href="javascript:;" >
            <i class="c-gotop-icon icon-comment-o"></i>
            <span class="c-gotop-text">官方微信</span>
            <div class="c-gotop-div">
                <p class="c-gotop-p">扫描二维码</p>
                <p class="c-gotop-p2">关注淘权网微信公众号</p>
                <span class="c-gotop-img" ></span>
            </div>
        </a>
        <a class="c-gotop-list" href="javascript:;" >
            <i class="c-gotop-icon icon-sina-weibo"></i>
            <span class="c-gotop-text">官方微博</span>
            <div class="c-gotop-div">
                <p class="c-gotop-p">扫描二维码</p>
                <p class="c-gotop-p2">关注淘权网微博</p>
                <span class="c-gotop-imgweibo"></span>
            </div>
        </a>
        <a class="c-gotop-list" href="javascript:;" v-show="isShow" v-on:click="onGoTop()">
            <i class="c-gotop-icon icon-chevron-thin-up"></i>
            <span class="c-gotop-text">回到顶部</span>
        </a>  
    </div>
</template>
<script>
    export default {
        name:"tq-gotop",
        created:function(){

        },
        mounted:function() {
            this.$nextTick(function () {
                window.onscroll=()=> {
                    //firefox //IE
                    document.scrollTop= document.documentElement.scrollTop||document.body.scrollTop 
                    //>网页可见区域高
                    var bodyHeight=window.innerHeight
                    //大于一屏距离显示gotop
                    if(document.scrollTop>bodyHeight){
                        this.isShow=true;
                    }else{
                        this.isShow=false;
                    }
                    
                }
            });
        },
        data: function () {
            return {
                isShow:false,
            }
        },
        methods: {
            onGoTop:function () {
                window.scrollTo(0,0)
            },
            onShowBox:function (event) {
                event=window.event|| event;
                var target=event.target ||event.srcElement
                var obj=target;
                if(obj.nodeName==="I"){

                    obj.style.display="none";
                    obj.nextElementSibling.style.display="block";
                    if(obj.parentNode.lastElementChild.nodeName==="DIV"){
                        obj.parentNode.lastElementChild.className+=" c-gotop-transition";
                    }
                }

            },
            onHideBox:function (event) {
                event=window.event|| event;
                var target=event.target ||event.srcElement
                var obj=target;
                if(obj.className==="c-gotop-text"){

                    obj.style.display="none";
                    obj.previousElementSibling.style.display="block";
                    if(obj.parentNode.lastElementChild.nodeName==="DIV"){
                        var box=obj.parentNode.lastElementChild;
                        box.className=box.className.replace(/ c-gotop-transition/g,"");
                    }
                }
                
            },
        },
    }
</script>
<style lang="less">
    /*回到顶部*/
.c-gotop{
    position: fixed;
    bottom: 150px;
    right: 0;
    z-index: 999;
    background-color: #fff;
    box-shadow: 0 4px 12px 0 rgba(7,17,27,0.2); 
    .c-gotop-list{
        display: block;
        width: 26px;
        height: 58px;
        margin: 0 16px;
        padding: 16px 0;
        // color: #b5b9bc;
        color: #999;
        text-align: center;
        border-bottom: 1px solid #edf1f2;
        text-decoration: none;
        .c-gotop-icon{
            display: block;
            width: 100%;
            height: 100%;
            font-size: 20px;
            line-height: 26px;
        }
        .c-gotop-text{
            display: block;
            width: 100%;
            height: 100%;
            font-size: 12px;
            color: #333;
            line-height: 12px;
            display: none;
        }
        .c-gotop-div{
            // display: none;
            padding: 20px;
            width: 160px;
            height: 200px;
            position: absolute;
            left:-162px;
            bottom:0;
            background: #fff;
            transition:all 0.3s ease 0s;
            transform: scale(.01);
            transform-origin: 100% 95%;
            opacity: 0;
            box-shadow: -4px 0px 12px 0 rgba(7, 17, 27, 0.2);
            p{
                line-height: 20px;
                text-align: center;
                height: 20px;
                font-size: 12px;
                color: #666;
                margin: 0;
            }
            .c-gotop-img{
                display: block;
                width: 100%;
                height: 120px;
                background: url("../asset/image/qrc_weixin.png") no-repeat 0 0;
                background-size: 100% 100%;
            }
            .c-gotop-imgweibo{
                display: block;
                width: 100%;
                height: 120px;
                background: url("../asset/image/qrc_weibo.png") no-repeat 0 0;
                background-size: 100% 100%;
            }
        }
        .c-gotop-transition{
            transform: scale(1);
            opacity: 1;
        }
        .c-show{
            display: block;
        }
    }
    // .c-gotop-to{
    //     display: none;
    // }
}
</style>