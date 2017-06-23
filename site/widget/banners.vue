<template>
	<div class="c-focus-map" v-on:mouseenter="stop" v-on:mouseleave="go">
        <!-- <transition  name="list" > -->
            <ul class="c-focus-pic" >     
                <li v-for="(item,index) in slideLists" :key="item" v-bind:class="[index==prevIndex?animateOut:'',index==currentIndex?animateIn:'']">
                    <a v-bind:href="item.clickUrl">
                        <img v-bind:src="item.image" alt="" :class="{'c-img-hover':imgHover}" >
                    </a>
                </li>
            </ul>
        <!-- </transition> -->
        <ul class="c-focus-message" v-if="isMsgUse" >
            <li v-for="(item,index) in slideLists" v-show="index===currentIndex" >
                <a v-bind:href="item.clickUrl" v-text="item.desc"></a>
            </li>
        </ul>
        <div class="c-focus-switch" v-bind:class="{'c-switch-style':isSwitchStyle}" v-if="isSwitchUse">
            <span v-for="(item,index) in slideLists.length" :class="{'active':index===currentIndex}" v-on:mouseover="change(index)"></span>
        </div> 
        <div class="c-focus-arrow" v-if="isArrowUse">
            <transition name="arrowLeft" >
                <span v-on:click="prevPlay" v-show="isArrow"></span>
            </transition>    
            <transition name="arrowRight">
                <span v-on:click="autoPlay" v-show="isArrow"></span>
            </transition>
        </div>
    </div>
</template>

<script>
    
	export default {
		name:"tq-banner",
        props:{
            //轮播图图片参数
            slideLists:{
                type: Array,
                required: true,
            },
            //自动播放时间
            autoPlayTime:{
                type: Number,
                default: 5000
            },
            //默认开启文本信息
            isMsgUse:{
                type: Boolean,
                default: true,
            },
            //默认开启左右箭头
            isArrowUse:{
                type: Boolean,
                default: true,
            },
            //默认开启选择按钮
            isSwitchUse:{
                type: Boolean,
                default: true,
            },
            //默认关闭图片效果
            imgHover:{
                type: Boolean,
                default: false,
            },
            isSwitchStyle:{
                type: Boolean,
                default: false,
            },
        },
        created:function () {
            
        },
		mounted: function () {
            this.$nextTick(function () {
                
                //设置最后一张图片为开始离开图片的索引
                this.prevIndex=this.slideLists.length!=0?this.slideLists.length-1:2;
                this.go();
            });
        },
        data: function () {
            return {
                // 配置信息
                //slideLists:this.slideLists,                 //轮播图图片参数
                // autoPlayTime:this.autoPlayTime,           //自动播放时间
                // isMsgUse:this.isMsgUse,                   //默认开启文本信息
                // isArrowUse:this.isArrowUse,               //默认开启左右箭头
                // isSwitchUse:this.isSwitchUse,             //默认开启选择按钮
                // imgHover:this.imgHover,                   //默认关闭图片效果
                
                //轮播图图片data
                //slideLists:[],                  
                //内置参数
                isArrow: false,                 //默认隐藏左右箭头
                prevIndex:0,                    //离开图片索引
                currentIndex: 0,                //进入图片索引
                timer: '',                      //定时器
	            imgSrcs:[],                     //图片地址数组
                animateIn: "animate-in-right",  //进入动画css样式
                animateOut: "animate-out-right",//离开动画css样式
	        }
        },
        computed:{
            
			
        },
        methods: {
            // 鼠标离开开启定时器自动播放
            go:function() {
                var _this=this;
                var autoPlayTime=this.autoPlayTime;

                this.isArrow=false;
                this.timer = setInterval(function () {
                     
                    _this.autoPlay();

                }, autoPlayTime);
            },
            // 鼠标进入关闭定时器停止自动播放
            stop:function() {
                clearInterval(this.timer);
               
                this.timer = null;
                this.isArrow=true;
            },
            // 点击按钮切换图片 
            change:function(index) {

                this.animateIn= "animate-in-right";
                this.animateOut= "animate-out-right";

                this.prevIndex = this.currentIndex;
                this.currentIndex = index;
            },
            // 自动切换图片和点击下一个箭头切换图片
            autoPlay:function() {
                this.animateIn= "animate-in-right";
                this.animateOut= "animate-out-right";

                this.prevIndex = this.currentIndex;
                this.currentIndex++;

                if (this.currentIndex > this.slideLists.length - 1) {
                    this.currentIndex = 0;
                }
            },
            // 点击上一个箭头切换图片
            prevPlay:function(){
                
                this.animateIn= "animate-in-left";
                this.animateOut= "animate-out-left";

                this.prevIndex = this.currentIndex;
                this.currentIndex--;

                if(this.currentIndex <0){
                    this.currentIndex = this.slideLists.length - 1;
                }  
            },
            // 动画效果
            // animates:function (flag) {
                
            //     var dd = this.$el.getElementsByClassName("c-focus-pic")[0];
            //     var child = dd.getElementsByTagName('li');
            //     var prev = this.prevIndex;
            //     var current = this.currentIndex;
            //     if(arguments.length==0){   //判断传人参数个数
            //         child[prev].className = "animate-out";
            //         child[current].className = "animate-in";
            //     }else{

            //         child[prev].className = "animate-out-l";
            //         child[current].className = "animate-in-l";
            //     }
            // },
        }
	}
</script>

<style lang="less">
    // 轮播图样式
    @hover-color:#E54C53;
    .c-focus-map{
        width: 100%;
        height: 100%;
        // margin-top: 30px;
        position: relative;
        overflow: hidden;
        .c-focus-pic{
            display: block;
            width: 4000%;
            height: 100%;
            transition: all 0.5s ease 0s;
            position: relative;
            li{
                width: 2.5%;
                height: 100%;
                float: left;
                position: absolute;
                
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .c-img-hover{
                        transition: all 0.5s ease 0s;
                    }
                    .c-img-hover:hover{
                        transform: scale(1.1,1.1);
                    }
                }
            }
            .animate-in-right{
                z-index: 2;
                animation: animate_in_right 1s ease 0s 1 normal both;
            }
            @keyframes animate_in_right {
                    0%{
                        transform: translateX(100%);
                    }
                    100%{
                        transform: translateX(0%);
                    }
            }
            .animate-out-right{
                z-index: 1;
                animation: animate_out_right 1s ease 0s 1 normal both;
            }
            @keyframes animate_out_right {
                    0%{
                        transform: translateX(0%);
                    }
                    100%{
                        transform: translateX(-100%);
                    }
            }
            .animate-in-left{
                z-index: 2;
                animation: animate_in_left 1s ease 0s 1 normal both;
            }
            @keyframes animate_in_left {
                    0%{
                        transform: translateX(-100%);
                    }
                    100%{
                        transform: translateX(0%);
                    }
            }
            .animate-out-left{
                z-index: 1;
                animation: animate_out_left 1s ease 0s 1 normal both;
            }
            @keyframes animate_out_left {
                    0%{
                        transform: translateX(0%);
                    }
                    100%{
                        transform: translateX(100%);
                    }
            }
        }
     
        .c-focus-message{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 60px;
            width: 100%;
            background: rgba(0,0,0,0.5);
         
            z-index: 3;
            li{
                height: 100%;
                width: 100%;
                a{
                    color: #fff;
                    line-height: 60px;
                    margin-left: 20px;
                    font-size: 16px;
                }
            }
        }
        .c-focus-switch{
            right: 0;
            position: absolute;
            bottom: 20px;
            z-index: 4;
            span{
                display: block;
                float: left;
                width: 30px;
                height: 10px;
                margin-right: 5px;
                background: rgba(0,0,0,0.3);
                cursor: pointer;
            }
            .active{
                background: @hover-color;
            }
        }
        .c-switch-style{
            bottom: 10px;
            span{
                display: block;
                float: left;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 5px;
                border: 1px solid @hover-color;
                background: rgba(255,255,255,0.8);
                cursor: pointer;
            }
        }
        .c-focus-arrow{
            span{
                position: absolute;
                display: block;
                background: rgba(0,0,0,0.3);
                cursor: pointer;
                top: 50%;
                margin-top: -20px;
                width: 40px;
                height: 40px;
                z-index: 3;
            }
            span:first-child{
                left: 0;
            }
            span:last-child{
                right: 0;
            }
            .arrowLeft-enter-active, .arrowLeft-leave-active {
                transition: all 1s;
                transform: translateX(0);
                opacity: 1;
            }
            .arrowLeft-enter, .arrowLeft-leave-active {
                opacity: 0;
                transform: translateX(-100%);
            }
            .arrowRight-enter-active, .arrowRight-leave-active {
                transition: all 1s;
            }
            .arrowRight-enter, .arrowRight-leave-active {
                opacity: 0;
                transform: translateX(100%);
            }
            
        }
    }
</style>