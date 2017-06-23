<template>
	<div class="c-login-wrapper" v-show="isShow" v-on:click.self="onCloseLogin" v-on:keyup.esc="onCloseLogin">
		<div class="c-login-box" id="c-login-box"  v-on:click="onEmptyValue($event)">
			<div class="c-login-entry" v-show="loginOrRegister">
				<div class="c-login-nav">
					<a class="c-login-list " v-bind:class="{'c-login-active':isActive}" v-on:click="onTabSwitch" href="javascript:;" >扫码登录</a>
					<a class="c-login-list" v-bind:class="{'c-login-active':!isActive}" v-on:click="onTabSwitch" href="javascript:;">登录</a>
				</div>
				<div class="c-login-content">
					<div class="c-login-qrcode" v-show="isActive">
						<div class="c-login-imgbox">
							<img v-bind:src="qrcodeLink" alt="" class="c-login-img">
							<span class="c-login-pic"></span>
							<span class="c-login-invalid" v-on:click="qrcodeLinkChange" v-show="isInvalid"></span>		
						</div>
						<p class="c-login-info">
							<span>打开<i>手机淘权</i></span>
							<b>扫描二维码</b>
						</p>
						<div class="c-login-adv">
							<span class="c-login-advbg"></span>
							<!-- <span class="c-login-advtext">免输入</span>
							<span class="c-login-advtext">更快</span>
							<span class="c-login-advtext">更安全</span> -->
						</div>
					</div>
					<div class="c-login-entry" v-show="!isActive">
						<form v-bind:action="action">
							<div class="c-login-error">
								<p v-bind:class="[{'c-login-success':isSuccessClass},'c-login-text']"  v-html="errorMsg" v-show="isErrorShow"></p>
							</div>	
							<label class="c-login-input" for="phone-number">
								<span class="c-login-span icon-chevron-thin-up"></span>
								<input id="phone-number" v-focus="!isActive&&loseBlur" @keyup.tab="onLoseBlur" v-on:keyup="phoneRegExp(phoneNumber)" v-model.trim="phoneNumber" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" type="text" placeholder="手机号码邮箱用户名">
								<i class="c-login-icon">×</i>
							</label>
							<label class="c-login-input" for="password">
								<span class="c-login-span icon-chevron-thin-up"></span>
								<input id="password" v-on:keyup="passwordRegExp(password)" v-model.trim="password" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" type="password" placeholder="密码">
								<i class="c-login-icon">×</i>
							</label>
							<div class="c-login-forgotbox">
								<a href="" class="c-login-forgot">忘记密码？</a>
							</div>
							<div class="c-login-btnbox">
								<a class="c-login-btn" href="javascript:;" v-on:click.stop="onChangeLogin">确定</a>
							</div>	
						</form>
					</div>
				</div>
			</div>
			<div class="c-login-register" v-show="!loginOrRegister">
				<div class="c-login-tit">
					<h3>注册</h3>
				</div>
				<div class="c-login-content">
					<form v-bind:action="action">
						<label class="c-login-input" for="phone-number-register">
							<span class="c-login-span icon-chevron-thin-up"></span>
							<input id="phone-number-register" v-focus="!loginOrRegister && loseBlur" @keyup.tab="onLoseBlur" v-on:keyup="phoneRegisterRegExp(phoneNumberReg)" v-model.trim="phoneNumberReg" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" type="text" placeholder="手机号码邮箱用户名">
							<i class="c-login-icon">×</i>
						</label>
						<p class="c-login-error" v-bind:class="{'c-login-success':isSuccessOne}" v-html="errorMsgOne"></p>
						<label class="c-login-input" for="password-register">
							<span class="c-login-span icon-chevron-thin-up"></span>
							<input id="password-register" v-on:keyup="passwordRegisterRegExp(passwordReg)" v-model.trim="passwordReg" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" type="password" placeholder="密码" >
							<i class="c-login-icon">×</i>
						</label>
						<p class="c-login-error" v-bind:class="{'c-login-success':isSuccessTwo}"  v-text="errorMsgTwo"></p>
						<label class="c-login-input" for="password-again">
							<span class="c-login-span icon-chevron-thin-up"></span>
							<input id="password-again" v-on:keyup="passwordAgainRegExp(passwordAgain)" v-model.trim="passwordAgain" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" type="password" placeholder="再次输入密码">
							<i class="c-login-icon">×</i>
						</label>
						<p class="c-login-error" v-bind:class="{'c-login-success':isSuccessThree}"  v-text="errorMsgThree"></p>
						<label class="c-login-input c-login-message" for="msg-code">
							<span class="c-login-span">短信验证码：</span>
							<input id="msg-code" v-model.trim="msgCode" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" v-on:keyup="msgCodeRegExp(msgCode)" type="text" placeholder="短信验证码">
							<b class="c-login-validate" v-on:click="onGetCode">{{msgCodeText}}</b>
						</label>
						<p class="c-login-error" v-bind:class="{'c-login-success':isSuccessFour}" v-text="errorMsgFour"></p>
						<label class="c-login-input c-login-random" for="img-code">
							<span class="c-login-span">验证码：</span>
							<input id="img-code"  v-model.trim="imgCode" v-on:focus="onFocusChange($event)" v-on:blur="onBlurChange($event)" v-on:keyup="imgCodeRegExp(imgCode)" type="text" placeholder="请输入图片内文字">
							<img v-on:click="onReloadImg" v-bind:src="reloadImg" alt="" class="c-login-img">
						</label>
						<p class="c-login-error" v-bind:class="{'c-login-success':isSuccessFive}" v-text="errorMsgFive"></p>
						<label for="check">
							<input id="check" v-model="isAgree" name="checkbox" value="1" type="checkbox">我同意<a v-bind:href="clauseAddress">条款</a>.
						</label>
						<p class="c-login-p" v-show="isAgree==false">请阅读条款并同意！</p>
						<div class="c-login-btnbox">
							<a class="c-login-cancel" href="javascript:;" v-on:click.stop="onCloseLogin">取消</a>
							<a class="c-login-create" href="javascript:;"  v-on:click.stop="onChangeRegister">注册</a>
						</div>
					</form>
				</div>
			</div>
			<div class="c-login-footer">
				<a class="c-login-a" v-on:click.stop="onSwitchState" v-show="!loginOrRegister" href="javascript:;">返回登录</a>
				<a class="c-login-a" v-on:click.stop="onSwitchState" v-show="loginOrRegister" href="javascript:;">立即注册</a>
			</div>
		</div> 
	</div>
</template>
<script>
    import axios from "axios"

    import { vmhtml } from "widget/bus.js"

	export default {
        name:"tq-login",
     	props:  { 
     		//表单请求地址
            action:{
                type:String,
                required: true,
                default:"http://127.0.0.1:9093/user",
            },
            // 条款链接地址
            clauseAddress:{
            	type:String,
                required: true,
                default:"http://127.0.0.1:9093/user",
            },
            // 二维码请求地址
            qrcodeAction:{
            	type:String,
                required: true,
                default:"http://127.0.0.1:9093/user",
            },
            msgCodeAction:{
                type:String,
                required: true,
                default:"http://api.tqtest.com/v1/captcha",
            },
            imgCodeAction:{
                type:String,
                required: true,
                default:"http://api.tqtest.com/v1/captcha",
            }
        }, 
        // components: {TqPopup},           //引人组件 
        created:function(){

        },
        mounted:function() {
            this.$nextTick(function () {
            	this.onReloadImg();
                this.qrcodeLinkChange();
            });
        },
        data: function () {
            return {
            	// 用户参数
               	isShow: true,			//登录框显示
               	
               	// 内置参数
               	isActive:true,			//扫码登录or帐号登录
               	loseBlur:true,          //默认获得焦点失去
               	
               	// 二维码登录
               	qrcodeLink:"",          //动态二维码图片
               	isInvalid:false,        //60s后二维码无效。显示刷新按钮
               	
                //帐号登录
               	loginOrRegister:true,	//显示登录or注册
               	phoneNumber:null,       //v-model登录电话号码
               	password:"",			//v-model登录密码
               	isSuccessClass:false,	//登录成功提示样式
                isErrorShow:false,      //错误提示框是否显示
               	errorMsg:"",			//登录错误提示信息
               	
               	//帐号注册
               	phoneNumberReg:null,	//v-model注册电话号码
               	passwordReg:"",			//v-model注册密码
               	passwordAgain:"",		//v-model注册密码again
               	msgCode:"",				//v-model注册用短信验证码
                msgCodeServer:"",       //短信验证码服务端响应值
                msgCodeText:"获取验证码",//注册短信验证码文字
               	imgCode:"",				//v-model注册用图片验证码
                imgCodeServer:"",       //图片验证码服务端响应值
               	reloadImg:"",			//图片验证码刷新地址
               	isAgree:false,          //同意条款

               	errorMsgOne:"",         //注册错误提示信息
               	isSuccessOne:false,	    //注册成功提示样式
               	errorMsgTwo:"",         //注册错误提示信息
               	isSuccessTwo:false,	    //注册成功提示样式
               	errorMsgThree:"",       //注册错误提示信息
               	isSuccessThree:false,	//注册成功提示样式
               	errorMsgFour:"",        //注册错误提示信息
               	isSuccessFour:false,	//注册成功提示样式
               	errorMsgFive:"",        //注册错误提示信息
               	isSuccessFive:false,	//注册成功提示样式

            }
        },
        computed: {
            //计算属性
            
        },
        watch: {
            // 监控属性
            
        },       
        methods: {
        	// 初始化样式
        	initStyle:function () {
        		if(this.isActive==false || this.loginOrRegister==false){
        			// this.isSuccessClass=false;
			        // this.isErrorShow=false;

                    // this.isSuccessOne=false;    
                    // this.isSuccessTwo=false;  
                    // this.isSuccessThree=false; 
                    // this.isSuccessFour=false; 
                    // this.isSuccessFive=false;    
        		}
        	},
        	// 使默认获得焦点失去
        	onLoseBlur:function () {
	        	this.loseBlur=false;
        	},
        	// 页面切换时第一个自动获得焦点
        	onGetfocus:function () {
        		this.loseBlur=true;
        	},
        	// 切换扫码登录or帐号登录
        	onTabSwitch:function () {
        		this.isActive=!this.isActive;
        		// this.initStyle();
        		this.onGetfocus();
        	},
        	// 关闭登录界面
        	onCloseLogin:function () {
        		this.isShow=false;
        		// this.initStyle();
        		this.onGetfocus();
        	},
        	// 切换登录or 注册
        	onSwitchState:function () {
        		this.loginOrRegister=!this.loginOrRegister;
        		// this.initStyle();
        		this.onGetfocus();
        	},
        	// input得到焦点父级添加class
        	onFocusChange:function (event) {
        		event=window.event||event;
        		event.target.parentNode.className+=" c-focus";
        	},
        	// input失去焦点删除父级class
        	onBlurChange:function (event) {
        		event=window.event||event;
        		this.onLoseBlur();
        		var parentNodeName=event.target.parentNode;
        		    parentNodeName.className=parentNodeName.className.replace(/ c-focus/g,"");

                this.onBlurRegExp(event);
        	},
            //失去焦点校验
            onBlurRegExp:function (event) {
                var inputNode=event.target;
                if(inputNode.id==="phone-number"){
                   
                    this.phoneRegExp(this.phoneNumber);
                }else if(inputNode.id==="password"){
                   
                    this.passwordRegExp(this.password);
                }else if(inputNode.id==="phone-number-register"){
                    
                    this.phoneRegisterRegExp(this.phoneNumberReg);
                }else if(inputNode.id==="password-register"){
                   
                    this.passwordRegisterRegExp(this.passwordReg);
                }else if(inputNode.id==="password-again"){
                    
                    this.passwordAgainRegExp(this.passwordAgain);
                }else if(inputNode.id==="msg-code"){
                    
                    this.msgCodeRegExp(this.msgCode);
                }else if(inputNode.id==="img-code"){
                    
                    this.imgCodeRegExp(this.imgCode);
                }else{
                    
                }
            },
        	// 点击x清除input值
        	onEmptyValue:function (event) {
        		event=window.event||event;
        		if(event.target.className=="c-login-icon"){
        			var inputNode=event.target.previousElementSibling;

        			if(inputNode.id==="phone-number"){
        				this.phoneNumber=null;
        				this.phoneRegExp(this.phoneNumber);
        			}else if(inputNode.id==="password"){
        				this.password="";
        				this.passwordRegExp(this.password);
        			}else if(inputNode.id==="phone-number-register"){
        				this.phoneNumberReg=null;
        				this.phoneRegisterRegExp(this.phoneNumberReg);
        			}else if(inputNode.id==="password-register"){
        				this.passwordReg="";
        				this.passwordRegisterRegExp(this.passwordReg);
        			}else if(inputNode.id==="password-again"){
        				this.passwordAgain="";
        				this.passwordAgainRegExp(this.passwordAgain);
        			}else{

                    }
        		}
        	},
        	//二维码失效提示
        	qrcodeInvalid:function () {

        		setTimeout(()=>{
        			this.isInvalid=true;
        		},60000);
        	},
        	//请求二维码地址
        	qrcodeLinkChange:function () {

        		var url=this.qrcodeAction+"?rnd=" + Math.random();
        		
        		axios.get(url).then(res=> {
                    var address="http://static.taoquanw.com/lib/shop/images/qrc_weibo.png";
        			// this.qrcodeLink=res.data;
                    this.qrcodeLink=address;
                    this.isInvalid=false;
        			this.qrcodeInvalid();
        			
				}).catch(error=> {
				    // console.log(error);
				});
        	},
        	/**
        	 * 登录事件
        	 */
        	// 登录帐号验证
        	phoneRegExp:function (val) {
        		var regPhone=/^1[34578]\d{9}$/;
                var regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                var regUser=/^[a-zA-z]\w{7,15}$/;
        		    this.isErrorShow=true;
        			if (regPhone.test(val)||regEmail.test(val)||regUser.test(val)) {

				        this.ajaxValidatephone(val);
				    } else {
				        this.isSuccessClass=false;
				        this.errorMsg="请输入手机号码，邮箱或用户名";
				    }
        	},
        	//服务端请求手机号码验证
        	ajaxValidatephone:function (val) {
        		
        		var url=this.action+"?mobile="+val;
        		
        		axios.get(url).then(res=> {
                  
        			if(res.data.length>0){
        				this.isSuccessClass=true;
				        this.errorMsg="帐号正确";
        			}else{
        				this.isSuccessClass=false;
				        this.errorMsg="帐号未注册，<a v-on:click='onSwitchState' href='javascript:;'>去注册</a>";
        			}
        			
				}).catch(error=> {
				    // console.log(error);
				});
        	},
        	// 密码验证
        	passwordRegExp:function (val) {
        		var re=/^[a-zA-z]\w{7,15}$/;
                    this.isErrorShow=true;
        		if (re.test(val)) {
			        this.isSuccessClass=true;
			        this.errorMsg="密码符合标准";
        		} else {

			        this.isSuccessClass=false;
			        this.errorMsg="请输入8位密码以字母下划线开始";
			    }
        	},
        	//登录按钮
        	onChangeLogin:function () {
              
        		if(this.isSuccessClass==true && this.phoneNumber.length>7 && this.password.length>7){
	        		
	        		var url=this.action+"?mobile="+this.phoneNumber+"&password="+this.password;
	        		
	        		axios.get(url).then(res=> {

	        			if(res.data.length>0){
	        				window.location.reload();
	        			}else{
		                 	this.isSuccessClass=false;
				        	
		                    this.errorMsg="密码或用户名错误";
	        			}
	        			
					}).catch(error=> {
					    // console.log(error);
					});
				}else{
					
					this.onGetfocus();
					this.phoneRegExp(this.phoneNumber);
				}
        	},
        	/**
        	 * 注册
        	 */
        	// 短信验证码
        	onGetCode:function () {
                if(this.msgCodeText==="获取验证码"){
            		var text=this.msgCodeText;
            		var times=60;
            			this.msgCodeText=times+"s后再次获取";

            		var timer=setInterval(()=>{
            				times--;
            				this.msgCodeText=times+"s后再次获取";
            				if(times==0){
            					this.msgCodeText=text;
            					clearInterval(timer);
            				}
            			},1000);

                    var url=this.msgCodeAction;
                    axios.get(url).then(res=> {
                        
                        this.msgCodeServer=res.data.phrase
                    }).catch(error=> {
                        // console.log(error);
                    });
                }
        	},
        	// 图片验证码
        	onReloadImg:function () {   
                var url=this.imgCodeAction;
                axios.get(url).then(res=> {
                    this.reloadImg = res.data.image;
                    this.imgCodeServer=res.data.phrase
                }).catch(error=> {
                    // console.log(error);
                });
            	
        	},
        	// 注册帐号验证
        	phoneRegisterRegExp:function (val) {
        		var regPhone=/^1[34578]\d{9}$/;
                var regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                var regUser=/^[a-zA-z]\w{7,15}$/;
                    this.isErrorShow=true;
                if (regPhone.test(val)||regEmail.test(val)||regUser.test(val)) {
        			
				   	this.ajaxValidateRegisterPhone(val);
			    } else {
			        this.isSuccessClass=false;
			        this.isSuccessOne=false;
			        this.errorMsgOne="请输入手机号码，邮箱或用户名";
			    }
        	},
        	//服务端请求验证注册号码
        	ajaxValidateRegisterPhone:function (val) {

        		var url=this.action+"?mobile="+val;
                
        		axios.get(url).then(res=> {
					if(res.data.length>0){
				        this.isSuccessClass=false;
				        this.isSuccessOne=false;
				        this.errorMsgOne="帐号已被注册，<a v-on:click='onSwitchState' href='javascript:;'>去登录</a>";
	    			}else{
	    				this.isSuccessClass=true;
				        this.isSuccessOne=true;
				        this.errorMsgOne="帐号未注册";
	    			}
    			}).catch(error=> {
				    // console.log(error);
				});
    			
        	},
        	// 密码验证
        	passwordRegisterRegExp:function (val) {
        		var re=/^[a-zA-z]\w{7,15}$/;
                
        		if(val.length==0){
        			this.isSuccessClass=false;
			        this.isSuccessTwo=false;
			        this.errorMsgTwo="密码不能为空";
        		}else{
	        		if (re.test(val)) {
	        			this.isSuccessClass=true;
                        this.isSuccessTwo=true;
				        this.errorMsgTwo="密码符合标准";
	        		} else {

				        this.isSuccessClass=false;
				        this.isSuccessTwo=false;
				        this.errorMsgTwo="请输入8位密码以字母下划线开始";
				    }
				}
        	},
        	// 再次输入密码
        	passwordAgainRegExp:function (val) {
                
        		if(this.passwordReg.length==0){
        			this.isSuccessClass=false;
			        this.isSuccessThree=false;
			        this.errorMsgThree="密码不能为空";
        			
        		}else if(this.passwordReg!=this.passwordAgain ){
        			this.isSuccessClass=false;
			        this.isSuccessThree=false;
			        this.errorMsgThree="两次密码不一致";
        		}else{
                    this.isSuccessClass=true;
                    this.isSuccessThree=true;
                    this.errorMsgThree="密码正确";
                }
        	},
            // 短信验证码校验
        	msgCodeRegExp:function (val) {
                
        		if(val.length==6){

					if(this.msgCodeServer==val){
				        this.isSuccessClass=true;
                        this.isSuccessFour=true;
                        this.errorMsgFour="短信验证码正确";
	    			}else{
                        this.isSuccessClass=false;
                        this.isSuccessFour=false;
                        this.errorMsgFour="输入有误，请重新输入";
	    			}
				}else{
					this.isSuccessClass=false;
                    this.isSuccessFour=false;
			        this.errorMsgFour="请输入6位短信验证码";
				}
                
        	},
            //图片验证码校验
        	imgCodeRegExp:function (val) {
               
        		if(val.length==5){
	        		
					if(this.imgCodeServer==val){
				        this.isSuccessClass=true;
				        this.isSuccessFive=true;
				        this.errorMsgFive="图片验证码正确";
	    			}else{
	    				this.isSuccessClass=false;
				        this.isSuccessFive=false;
				        this.errorMsgFive="输入有误，请重新输入";
	    			}
				}else{
					this.isSuccessClass=false;
                    this.isSuccessFive=false;
			        
			        this.errorMsgFive="请输入5位验证码";
			    }
			    
        	},
        	onChangeRegister:function () {
        		if(this.isSuccessClass==true && this.phoneNumberReg.length>7 && this.passwordReg.length>7 && this.passwordAgain.length>7 && this.msgCode.length==6 &&this.imgCode.length==5 && this.isAgree==true){
	        		
	        		var url=this.action
	        		var option={
	        				mobile:this.phoneNumberReg,
	        				password:this.passwordReg,
			               	msgCode:this.msgCode,
			               	imgCode:this.imgCode,
	        			}
	        		axios.post(url,option).then(res=> {

	        			alert("注册成功！！！")
	        			
	        			window.location.replace("http://www.baidu.com");

					}).catch(error=> {
					    // console.log(error);
					});
				}else{
					
					this.onGetfocus();
					this.phoneRegisterRegExp(this.phoneNumberReg);
				}
        	},
        }
    }
</script>

<style lang="less">
	.c-login-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100001;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.01);
		.c-login-box{
			position: absolute;
			left: 50%;
			top: 0;
			-ms-transform: translate(-50%,100px);		/* IE 9 */
			-webkit-transform: translate(-50%,100px);	/* Safari and Chrome */
			-o-transform: translate(-50%,100px);		/* Opera */
			-moz-transform: translate(-50%,100px);		/* Firefox */
			transform: translate(-50%,100px);
			box-shadow: 0 0 5px rgba(0,0,0,0.3);
			width: 350px;
			border-radius: 5px;
			overflow: hidden;
			background: #fff;
			.c-login-entry{
				width: 100%;
				.c-login-nav{
					position: relative;
					width: 100%;
					height: 50px;
					border-bottom: 1px solid #ddd;
					.c-login-list{
						display: block;
						float: left;
						width: 50%;
						height: 100%;
						text-align: center;
						line-height: 49px;
						color: #333;
						text-decoration: none;
					}
					.c-login-list:first-child{
						// border-right: 1px solid #ddd;
					}
					.c-login-active{
						background: #e54c53;
						color: #fff;
					}
				}
				.c-login-content{
					width: 100%;
					padding: 10px 20px;
					position: relative;
					.c-login-qrcode{
						width: 100%;
						.c-login-imgbox{
							width: 100%;
							height: 160px;
							position: relative;
							margin-top: 55px;
							transition: all 0.5s ease 0s;
							.c-login-img{
								display: block;
								width: 160px;
								height: 160px;
								margin: 0 auto;
							}
							.c-login-pic{
								position: absolute;
								top: 0;
								right: -100px;
								display: block;
								width: 150px;
								height: 160px;
								background: url(../asset/image/phone-orange.png) no-repeat 0 0;
								background-size: 100% 100%;
								display: none;
							}
							.c-login-invalid{
								position: absolute;
								top: 0;
								left: 50%;
								margin-left:-80px;
								width: 160px;
								height: 160px;
								background:rgba(0, 0, 0, 0.1) url(../asset/image/refresh.png) no-repeat center center;
								z-index: 2;
							}
						}
						.c-login-imgbox:hover{
							-ms-transform: translate(-75px,0);		/* IE 9 */
							-webkit-transform: translate(-75px,0);	/* Safari and Chrome */
							-o-transform: translate(-75px,0);		/* Opera */
							-moz-transform: translate(-75px,0);		/* Firefox */
							transform: translate(-75px,0);
						}
						.c-login-imgbox:hover .c-login-pic{
							display: block;
						}
						.c-login-info{
							margin: 18px 0 14px 0;
							text-align: center;
							font-size: 12px;
							height: 20px;
							line-height: 20px;
							span{
								i{
									font-style: normal;
									color: #e54c53;
								}
							}
							b{
								font-weight: 400;
								margin-left: 10px;
							}
						}
						.c-login-adv{
							width: 100%;
							height: 40px;
							span{
                                display: block;
								width: 100%;
								height: 100%;
                                background: url(../asset/image/logo.png) no-repeat 0 0;
                                background-size: 100% 100%;
							}
						}
					}
					.c-login-entry{
						width: 100%;
						form{
							.c-login-error{
								width: 100%;
								height: 42px;
								margin-top: 20px;
								p{
									width: 100%;
									max-height: 40px;
									line-height: 40px;
									color: #e54c53;
									font-size: 12px;
									overflow: hidden;
								}
								p:before{
									content: "—";
									display: block;
									float: left;
									border-radius: 50%;
									color: #fff;
									text-align: center;
									line-height: 16px;
									font-weight: 800;
									background-size: 100% 100%;
									width: 16px;
									height: 16px;
									margin: 12px 14px;
								}
								.c-login-text{
									border:1px solid #faccc6;
									background: #ffebeb;
								}
								.c-login-text:before{
									content: "—";
									background: #e54c53;
								}
								.c-login-success{
									border:1px solid #398439;
									background: #5cb85c;
									color:#fff;
								}
								.c-login-success:before{
									content: "√";
									background: #449d44;
								}
							}
							.c-login-input{
								display: block;
								width: 100%;
								height: 42px;
								margin-top: 20px;
								overflow: hidden;
								border: 1px solid #ddd;
								background: #fff;
								font-weight:400;
								.c-login-span{
									display: block;
									float: left;
									width: 40px;
									height: 100%;
									line-height: 40px;
	    							text-align: center;
								}
								input{
									display: block;
									float: left;
									width: 238px;
									height: 100%;
									line-height: 40px;
									text-indent: 10px;
									background: #fff;
									font-size: 12px;
								}
								.c-login-icon{
									display: block;
									float: right;
									width: 20px;
									height: 20px;
									font-size: 20px;
									text-align: center;
									line-height: 20px;
									margin: 10px 5px;
									cursor: pointer;
									color: #999;
									transition: all 0.5s ease 0s;
								}
								.c-login-icon:hover{
									color: #333;
									-ms-transform: rotate(180deg);		/* IE 9 */
									-webkit-transform: rotate(180deg);	/* Safari and Chrome */
									-o-transform: rotate(180deg);		/* Opera */
									-moz-transform: rotate(180deg);		/* Firefox */
									transform: rotate(180deg);
								}
								
							}
							.c-focus{
							 	border: 1px solid #e54c53;
							}

							.c-login-forgotbox{
								width: 100%;
								height: 40px;
								margin-top: 10px;
								.c-login-forgot{
									float: right;
									line-height: 40px;
									color:#333;
									font-size: 12px;
								}
								.c-login-forgot:hover{
									color:#e54c53;
									text-decoration: underline;
								}
							}
							.c-login-btnbox{
								width: 100%;
								height: 40px;
								margin-top: 10px;
								.c-login-btn{
									width: 100%;
									height: 100%;
									
									line-height: 40px;
									display: block;
									background: #e54c53; 
									color: #fff;
									font-size: 16px;
									border-radius: 5px;
									letter-spacing: 30px;
									text-indent: 30px;
									text-align: center;
								}
								.c-login-btn:active{
									box-shadow: 0 0 5px 5px rgba(255,255,255,0.3) inset;
								}
							}
							
						}
					}
					
				}
			}
			.c-login-register{
				width: 100%;
				.c-login-tit{
					width: 100%;
					height: 50px;
					h3{
						line-height: 50px;
						width: 100%;
						background: #e54c53;
						color: #fff;
						font-size: 16px;
						text-align: center;
					}
				}
				.c-login-content{
					padding: 10px 20px;
					width: 100%;
					form{
						.c-login-input{
							display: block;
							width: 100%;
							height: 42px;
							margin-top: 10px;
							overflow: hidden;
							border: 1px solid #ddd;
							background: #fff;
							font-weight:400;
							.c-login-span{
								display: block;
								float: left;
								width: 40px;
								height: 100%;
								line-height: 40px;
								text-align: center;
							}
							input{
								display: block;
								float: left;
								width: 238px;
								height: 100%;
								line-height: 40px;
								text-indent: 10px;
								background: #fff;
								font-size: 12px;
							}
							.c-login-icon{
								display: block;
								float: right;
								width: 20px;
								height: 20px;
								font-size: 20px;
								text-align: center;
								line-height: 20px;
								margin: 10px 5px;
								cursor: pointer;
								color: #999;
								transition: all 0.5s ease 0s;
							}
							.c-login-icon:hover{
								color: #333;
								-ms-transform: rotate(180deg);		/* IE 9 */
								-webkit-transform: rotate(180deg);	/* Safari and Chrome */
								-o-transform: rotate(180deg);		/* Opera */
								-moz-transform: rotate(180deg);		/* Firefox */
								transform: rotate(180deg);
							}
						}
						.c-focus{
						 	border: 1px solid #e54c53;
						}
						.c-login-error{
							height: 20px;
							line-height: 20px;
							font-size: 12px;
							width: 100%; 
							color: #e54c53; 
						}
						.c-login-success{
							color: #5cb85c;
						}
						.c-login-message{
							.c-login-span{
								width: 90px;
								background: #fff;
								text-align: center;
								line-height: 40px;
								font-size: 12px;
							}
							input{
								width: 120px;
							}
							.c-login-validate{
								width: 90px;
								height: 30px;
								display: block;
								font-weight: 400;
								font-size: 12px;
								color: #999;
								float: right;
								margin: 5px 5px 0 0;
								background: #fff;
								text-align: center;
								line-height: 28px;
								cursor: pointer;
								border: 1px solid #ddd;
								border-radius: 5px;
							}
						}
						.c-login-random{
							.c-login-span{
								width: 60px;
								background: #fff;
								text-align: center;
								line-height: 40px;
								font-size: 12px;		
							}
							input{
								width: 160px;		
							}
							img{
								display: block;
								float: right;
								width: 80px;
								height: 30px;
								margin: 5px 5px 0 0;
							}
						}
						label{
							margin-top: 10px;
							width: 40%;
							height: 20px;
							line-height: 20px;
							font-weight: 400;
							vertical-align: middle;
							input[type=checkbox]{
								vertical-align: middle;
								margin: 0 5px 0 0;
							}

						}
						.c-login-p{
							margin-top: 10px;
							display: inline-block;
							width: 50%;
							height: 20px;
							line-height: 20px;
							color: #e54c53;
							vertical-align: middle;
						}
						.c-login-btnbox{
							width: 100%;
							height: 40px;
							margin-top: 10px;
							a{
								width: 50%;
								float: left;
							    height: 100%;
							    line-height: 40px;
							    display: block;
							    font-size: 16px;
							    letter-spacing: 30px;
							    text-indent: 30px;
							    text-align: center;
							}
							.c-login-cancel{
								border-radius: 5px 0 0 5px;
								background: #ddd;
							    color: #333;
							}
							.c-login-create{
								border-radius: 0 5px 5px 0;
								background: #e54c53;
							    color: #fff;
							}
							.c-login-cancel:active,.c-login-create:active{
								box-shadow: 0 0 5px 3px rgba(0,0,0,0.1) inset;
							}
						}
					}
				}	
			}
			.c-login-footer{
				width: 100%;
				height: 60px;
				padding: 10px 20px;
				border-top: 1px solid #ddd;
				.c-login-a{
					float: right;
					line-height: 40px;
					color: #333;
				}
				.c-login-a:before{
					content: ">>";
				}
				.c-login-a:hover{
					color: #e54c53;	
				}
			}
		}
	}
</style>