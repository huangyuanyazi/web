<template>
	<div class="c-popup-wrapper" v-show="isShow" >
		<div class="c-popup-box" id="c-popup-box" v-bind:style="styleObject">
			<div class="c-popup-title" v-on:mousedown="onMousedownPopup($event)" v-on:mouseup="onMouseupPopup($event)">
				<h3 class="c-popup-h3" >提示</h3>
				<i class="c-popup-close" v-on:mousedown.stop="" v-on:click="onClosePopup">×</i>
			</div>
			<div class="c-popup-content">
				<input class="c-popup-input" v-if="popupType=='prompt'" v-focus="isShow" v-model="returnData" placeholder="输入内容" type="text" >
				<p v-else class="c-popup-info">{{popupMsg}}</p>
			</div>
			<div class="c-popup-footer">
				<a class="c-popup-btn" href="javascript:;" v-if="popupType!='alert'" v-on:click.stop="onClosePopup">取消</a>
				<a href="javascript:;" v-bind:class="[popupType=='alert' ? 'c-popup-onlybtn' : 'c-popup-btn']" v-on:click.stop="onChangePopup">确定</a>
			</div>
		</div>
	</div>
</template>
<script>
    import axios from "axios"

    import { vmhtml } from "widget/bus.js"

	export default {
        name:"tq-popup",
     	props:  { 
            
        },  
        created:function(){
            vmhtml.$on("receiveChange",val=>{
            	this.isShow=val.isShow;
            	this.popupMsg=val.popupMsg;
            	this.popupType=val.popupType;
            })
        },
        mounted:function() {
            this.$nextTick(function () {
            	this.onmousemovePopup();
            });
        },
        data: function () {
            return {
               	isShow:false, 					//popup box 是否显示
               	popupMsg:"ok!!!",				//弹窗提示信息
               	popupType:"alert",				//弹窗类型 alert confirm prompt
               	returnData:"",					//点击确认返回信息 vmhtml.$on("sendChange",val)
               	flag:false,						
               	mouseToBoxWidth:0,				//鼠标点击盒子标题时距离盒子边框长度
               	mouseToBoxHeight:0,				//鼠标点击盒子标题时距离盒子边框高度
               	styleObject:{					//弹窗box 的style 样式
               		top:"50%",
               		left:"50%",
               		margin:"-100px 0 0 -150px",
               	},
            }
        },
        computed: {
            //计算属性
        },
        watch: {
            // 监控属性
            
        },       
        methods: {
        	onmousemovePopup:function () {
        		$(window).mousemove(event=> {
        			event=event|| window.event;
        			if(this.flag){
        				var boxLeft=event.clientX-this.mouseToBoxWidth;
        				var boxTop=event.clientY-this.mouseToBoxHeight;

        				this.styleObject.top=boxTop+"px";
        				this.styleObject.left=boxLeft+"px";
        				this.styleObject.margin=0;
        			}
        		});	
        	},
        	onMousedownPopup:function (event) {
        		event=event|| window.event;
        		var target=event.target ||event.srcElement
        		this.flag=true;
        		this.mouseToBoxWidth=event.clientX-target.offsetParent.offsetLeft;
        		this.mouseToBoxHeight=event.clientY-target.offsetParent.offsetTop;
        	},
        	onMouseupPopup:function () {
        		this.flag=false;
        	},
        	onClosePopup:function () {

        		this.isShow=false;
        		this.initBoxStyle();
        	},
        	onChangePopup:function () {
        		this.isShow=false;
        		this.returnData="";
        		this.sendData();
               	this.initBoxStyle();
        	},
        	sendData:function () {
        		var val="";
        		if(this.popupType=="prompt"){
        			val=this.returnData;
        		}else{
        			val=true;
        		}
        		vmhtml.$emit("sendChange",val)
        	},
        	initBoxStyle:function () {
        		if(this.isShow===false){
	        		this.styleObject.top="50%";
					this.styleObject.left="50%";
					this.styleObject.margin="-100px 0 0 -150px";
				}
        	},
        }
    }
</script>

<style lang="less">
	.c-popup-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
		.c-popup-box{
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -100px 0 0 -150px;
			width: 300px;
			height: 200px;
			border-radius: 5px;
			box-shadow: 0 0 5px rgba(0,0,0,0.3);
			overflow: hidden;
			background: #fff;
			.c-popup-title{
				width: 100%;
				height: 40px;
				background: #e54c53;
				border-bottom: 1px solid #ddd;
				.c-popup-h3{
					height: 100%;
					line-height: 39px;
					text-indent: 20px;
					font-size: 14px;
					float: left;
					color: #fff;
				}
				.c-popup-close{
					display: block;
					position: absolute;
					right: 10px;
					top: 9px;
					width: 22px;
					height: 22px;
					line-height: 22px;
					text-align: center;
					border-radius: 50%;
					font-size: 20px;
					font-style: normal;
					cursor: pointer;
					color: #fff;
					transition:all 0.5s ease 0s;
				}
				.c-popup-close:hover{
					background: rgba(255,255,255,0.8);
					color: #e54c53;
					-ms-transform: rotate(180deg);		/* IE 9 */
					-webkit-transform: rotate(180deg);	/* Safari and Chrome */
					-o-transform: rotate(180deg);		/* Opera */
					-moz-transform: rotate(180deg);		/* Firefox */
					transform: rotate(180deg);
				}
			}
			.c-popup-content{
				width: 100%;
				height: 100px;
				padding: 5px 10px;
				position: relative;
				.c-popup-input{
					margin: 30px 5%;
					border: 1px solid #ddd;
					width: 90%;
					height: 40px;
					line-height: 38px;
					background: #fff;
					text-indent: 10px;
					border-radius: 5px;
				}
				.c-popup-input:focus{
					border: 1px solid #e54c53;
				}
				.c-popup-info{
					position: absolute;
					top: 50%;
					left: 50%;
					-ms-transform: translate(-50%,-50%);	/* IE 9 */
					-webkit-transform: translate(-50%,-50%);	/* Safari and Chrome */
					-o-transform: translate(-50%,-50%);	/* Opera */
					-moz-transform: translate(-50%,-50%);	/* Firefox */
					transform:translate(-50%,-50%);
					text-align: center;
					line-height: 30px;
				}
			}
			.c-popup-footer{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 60px;
				padding: 10px 20px;
				border-top: 1px solid #ddd;
				a{
					display: block;
					float: left;
					height: 100%;
					line-height: 39px;
					text-align: center;
					color: #fff;
				}
				.c-popup-btn{
					width: 50%;
				}
				.c-popup-btn:first-child{
					border-radius: 5px 0 0 5px;
					background: #bbb;
				}
				.c-popup-btn:last-child{
					border-radius: 0 5px 5px 0;
					background: #e54c53;
				}
				a.c-popup-onlybtn{
					width: 100%;
					background: #e54c53;
					border-radius: 5px;
				}
			}
		}
	}
</style>