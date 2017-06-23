<template>
	<div class="c-comment-box" id="c-comment-wrapper">
        <div class="c-comment-arrow"></div>
        <div class="c-comment-input">  
            <textarea  v-model="commentText" v-bind:autofocus="isAutoFocus" v-focus="commentText.length>0" v-on:focus="onFocusHideComment" placeholder="请输入评论" name="" ></textarea>
            <div class="c-comment-btn">
                <tq-emoticon v-on:on-emj-change="onEmjChange"></tq-emoticon>
                <input class="c-comment-publish" v-bind:disabled="commentText.length==0"  v-bind:class="{isdisabled:commentText.length==0}" v-on:click="publishReply" type="button" name="" value="发布">
                <div class="c-comment-login">
                    <span class="c-comment-entry">登录</span>
                    <span>|</span>
                    <span class="c-comment-enroll">注册</span>
                </div>
            </div>
        </div>
        <div class="c-comment-content">
            <h3 class="c-comment-h3">最新评论</h3>
            <ul class="c-comment-list">
                <li class="c-comment-item" v-for="(item, index) in commentInfo" v-if="index<showCommentNum" >
                    <div class="c-comment-head">
                        <a v-bind:href="item.homepage"><img v-bind:src="item.headSrc" alt=""></a>
                   </div>
                    <div class="c-comment-details">
                        <div class="c-comment-commentInfo">
                            <a v-bind:href="item.homepage" v-text="item.userName"></a>
                            <span>[<i v-text="item.city"></i>]：</span>
                        </div>
                        <div class="c-comment-text" v-html="item.replyText"></div>
                    </div>
                    <div class="c-comment-label">
                        <div class="c-comment-word">
                            <span class="c-comment-time" v-text="item.replyTime">4月8日04:17</span>
                            <div class="c-comment-btn2">
                                <transition name="support"><b v-if="item.supportShow">+1</b></transition>
                                <span v-if="item.support" v-on:click.once="onSupport(index)" >已支持(<i class="c-comment-support" title="支持" v-text="item.support"></i>)</span>
                                <span v-else v-on:click.once="onSupport(index)" >支持</span>
                                <span class="c-comment-reply" title="回复" v-on:click="onReply(index)">回复</span>
                            </div>    
                        </div>
                        <div class="c-comment-input" v-show="item.isreply">  
                            <textarea v-model="replyText" v-focus="replyText.length>0" placeholder="请输入评论" name="" v-on:keyup="inputBoxHeightAuto($event)"></textarea>
                            <div class="c-comment-btn">
                                <tq-emoticon v-on:on-emj-change="onEmjChange"></tq-emoticon>
                                <input class="c-comment-publish" v-bind:disabled="replyText.length==0" v-bind:class="{isdisabled:replyText.length==0}" v-on:click="publishReply(index)" type="button" name="" value="发布">
                                <div class="c-comment-login">
                                    <span class="c-comment-entry">登录</span>
                                    <span>|</span>
                                    <span class="c-comment-enroll">注册</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="c-comment-loading" >
                <div class="c-comment-load" v-show="iconLoading">
                    <span>正在加载中...</span><i></i>
                </div>
                <div class="c-comment-nomore" v-show="noMoreLoad">
                     <span>没有更多内容了...</span>
                </div>
            </div>  
            <div class="c-comment-more" >
                <a class="c-comment-moreto" v-on:click.stop="onShowMoreComment" href="javascript:;">查看更多精彩评论>></a>
                <span v-on:click="hide">收起</span>
            </div>
        </div>
        <tq-popup ></tq-popup> 
    </div>
</template>

<script>
    import axios from "axios"

    //引人表情包组件
    import TqEmoticon from "widget/emoticon.vue"
    import TqPopup from "widget/popup.vue"
    
    import { vmhtml } from "widget/bus.js"
	export default {
        name:"tq-comment",
     	props:  { 
            //更多评论请求地址
            requestAddress:{
                type:String,
                required: true,
            },
            //更多评论一次加载多少Limit
            editCommentLimit:{
                type:Number,
                default: 5,
            },
        },                  
        components: {TqEmoticon,TqPopup},           //引人组件
        created:function(){
            this.loadCommentData();
            this.getMaxPage();
            this.loadBefore();
            this.loadAfter();
        },
        mounted:function() {
            this.$nextTick(function () {

                this.scrollFooterLoad();
            });
        },
        data: function () {
            return {
                //用户配置参数
                showCommentNum:this.editCommentLimit,   //显示评论总数

                //接受子组件表情包传递的数据phrase
                emjData:[],                    

                //内置参数
                commentInfo:[],                 //请求评论data 
                commentPage:0,                  //评论分页页码      
                maxPage:null,                   //评论分页最大页码
                commentText: "",                //评论的textarea 数据
                replyText: "",                  //回复内textarea 数据
                commentIndex:"",                //接受点击表情包时获取 当前textarea索引
                prevIndex:null,                 //上一个被选中回复的索引
                iconLoading:false,              //正在加载图标
                noMoreLoad:false,               //没有更多加载内容提示

                //popup
            }
        },
        computed: {
            //计算属性
            isAutoFocus:function () {
                var anchorName=location.hash;
                var autofocus="autofocus";
                if(anchorName=="#c-comment-wrapper"){
                    return autofocus;
                }
            }
        },
        watch: {
            // 监控属性
            
        },       
        methods: {
            // 隐藏更多评论
            hide:function(){
                
                this.showCommentNum= this.editCommentLimit;

            },
            // 显示更多评论
            onShowMoreComment:function () {

                if(this.commentPage<this.maxPage){
                    this.loadCommentData();
                }else{
                    this.noMoreLoad=true;
                    setTimeout(()=>{
                        this.noMoreLoad=false;
                    }, 100);
                }
                this.showCommentNum=this.showCommentNum*this.commentPage;
            },
            //滚动到底部加载数据
            scrollFooterLoad:function () {
                
                $(window).scroll(()=>{  
                    var wScrollY = window.scrollY; // 当前滚动条位置    
                    var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）    
                    var bScrollH = document.body.scrollHeight; // 滚动条总高度        
                    if (wScrollY + wInnerH >= bScrollH-100) {            
                        this.onShowMoreComment();
                    }   
                });
                
            },
            // 加载评论数据
            loadCommentData:function () {
                
                var url=this.requestAddress+"?_page="+this.commentPage+"&_limit="+this.editCommentLimit;
                
                this.commentPage++;
                // db.json加载
                axios.get(url).then(res => {

                    for (var i = 0; i < res.data.length; i++) {
                       this.commentInfo.push(res.data[i])
                    }
                    
                }).catch(error=> {

                    this.requestError(error);
                })
            },
            //获取最大页码
            getMaxPage:function () {

                axios.get(this.requestAddress).then(res => {
                   this.maxPage= Math.ceil(res.data.length/this.showCommentNum);
                }).catch(error=> {
                   
                    this.requestError(error);
                })
            },
            //异步加载请求发送前
            loadBefore:function () {
                
                // 添加请求拦截器
                axios.interceptors.request.use(config=> {
                    // 在发送请求之前做些什么
                    this.iconLoading=true;
                    return config;
                }, function (error) {
                    // 对请求错误做些什么
                    return Promise.reject(error);
                });
            },
            //异步加载接受服务器信息前
            loadAfter:function () {
                // 添加响应拦截器
                axios.interceptors.response.use(response=> {
                    // 对响应数据做点什么
                    this.iconLoading=false;

                    return response;
                }, function (error) {
                    // 对响应错误做点什么
                    return Promise.reject(error);
                });
            },
            requestError:function (error) {
                if (error.response) {
                  // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
            },
            //获得焦点隐藏最新评论的评论框
            onFocusHideComment:function () {
                for (var i = 0; i < this.commentInfo.length; i++) {
                    this.commentInfo[i].isreply=false;
                }
            },
            //处理子组件传递参数
            onEmjChange:function (emj) {
                
                var len=$(emj.obj.target).parents(".c-comment-content").length;
                 
                // 判断对象是否存在祖节点c-comment-content
                // 不存在为评论的textarea
                // 存在则为回复的textarea
                if(len==0){
                    // 隐藏回复评论框
                    this.onFocusHideComment(); 
                    this.commentText+=emj.phrase;            
                }else{
                    this.replyText+=emj.phrase;
                }
                this.emjData.push(emj);
            },
            // 评论框高度自适应
            inputBoxHeightAuto:function(event) {
                
                event= event || window.event;

                var target= event.target || event.srcElement;
                 
                    if(target.scrollHeight<192){

                        target.style.height=target.scrollHeight+2+"px";
                        
                    }                   
            },
            // 评论框高度初始化
            inputBoxHeightDefault:function (event) {
                event= event || window.event;
                var target= event.target || event.srcElement;

                if(target.nodeName=="textarea"){

                   target.style.height="46px";
                }
            },
            // 发表
            publishReply:function (index) {
                var replyContent="";

                //确认登录
                if(true){
                    if(typeof index=="number"){

                        //最新评论回复内容
                        replyContent=this.replyText;
                        // 给带@用户名添加链接
                        replyContent=this.userAddLink(index,replyContent);
                        //替换文字为表情包
                        this.replaceText(replyContent);
                        // 隐藏回复评论框
                        this.commentInfo[index].isreply=false;
                        // 清空最新评论回复内容
                        this.replyText="";
                        
                    }else{
                        //文章下评论内容
                        replyContent=this.commentText;
                        //替换文字为表情包
                        this.replaceText(replyContent);
                        // 清空文章下评论内容
                        this.commentText="";
                    }
                    
                }else{
                    alert("请登录！");
                }
            },
            //给带@用户名添加链接
            userAddLink:function (index,replyContent) {
                var str="@"+this.commentInfo[index].userName;          //获取回复上一级用户名称
                var indexPos=replyContent.indexOf(str);                     //判断用户名称在回复文章的索引位置
                var newstr=str.link(this.commentInfo[index].homepage); //给用户名添加链接
                    
                if(indexPos==0){
                   replyContent=replyContent.replace(str, newstr);              //判断在最前面时 替换原来用户名
                }
                return replyContent
            },
            //替换文字为表情包
            replaceText:function (replyContent) {
                //获取表情包数据 
                var emjData=this.emjData;                           
                var phrase="";
                var src="";
                    if(emjData.length>0){

                        //替换文字为表情包
                        for (var i = 0; i < emjData.length; i++) {   
                            phrase= emjData[i].phrase;
                            src='<img src="'+emjData[i].url+'">';
                            replyContent=replyContent.replace(phrase, src);
                        }
                    }
                var publishTime= new Date().toLocaleString();
                var data={
                    "cid":"C001",
                    "userName": "用户6",
                    "homepage": "#",
                    "headSrc": "http://img2.cache.netease.com/media/2016/6/18/20160618231436dd785.jpg",
                    "city": "辽宁抚顺",
                    "replyText": replyContent,
                    "replyTime": publishTime,
                    "support": null,
                    "supportShow": false,
                    "isreply":false                   
                }
                // this.commentInfo.push(data);
                this.ajaxSendData(data);
            },
            //发送评论数据
            ajaxSendData:function (data) {
                
                axios.post(this.requestAddress,data).then(res => {
                    
                    this.getMaxPage();
                    var val={
                        isShow:true,
                        popupMsg:"发布成功！！！",
                        popupType:"alert",
                    }
                    vmhtml.$emit("receiveChange",val)

                }).catch(error=> {

                    this.requestError(error);  
                })
            },
            // 支持
            onSupport:function(index){
               
                // if(this.commentInfo[index].support!=null){
                    this.commentInfo[index].support++;
                // }else{
                //     this.commentInfo[index].support=1;
                // }
                
                this.commentInfo[index].supportShow = true;
               
                setTimeout(()=>{
                    this.commentInfo[index].supportShow = false;
                }, 1000);

                // var url=this.requestAddress+"?id="+index;
                // axios.get(url,{support:this.commentInfo[index].support}).then(res => {
                //    console.log(res.data)
                //    
                // }).catch(error=> {
                //       this.requestError(error);
                // })
            },
            //回复
            onReply:function(index){

                //点击回复清空发表的评论内容
                this.commentText="";
                this.replyText="";
                /**
                 * 判断点击回复按钮是否不是上次点击。
                 * 为真 && !=null 则隐藏上一个textarea，显示当前textarea 
                 * 为false 隐藏当前textarea，并把上一个致空；
                 */
                if(this.prevIndex!=index){

                    if(this.prevIndex==null){

                        this.commentInfo[index].isreply=!this.commentInfo[index].isreply;
                    }else{

                        this.commentInfo[this.prevIndex].isreply=false;
                        this.commentInfo[index].isreply=true;
                    }
                    this.replyText="@"+this.commentInfo[index].userName+"：";
                    this.prevIndex=index;
                }else{
                    
                    this.commentInfo[index].isreply=!this.commentInfo[index].isreply;
                    this.prevIndex=null;
                    if(this.commentInfo[index].isreply){
                        this.replyText="@"+this.commentInfo[index].userName+"：";
                        this.prevIndex=index;
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    //评论  样式
    .c-comment-box{
        width: 100%;
        margin-top: 10px;
        border: 1px solid #E9E9E9;
        background: #fff;
        position: relative;
        .c-comment-arrow{
            position: absolute;
            top: -18px;
            right: 93px;
        }
        .c-comment-arrow:before{
            content: "";
            display: block;
            position: absolute;
            border: 10px solid #ddd;
            top: -2px;
            border-color: transparent transparent #ddd  transparent ;
        }
        .c-comment-arrow:after{
            content: "";
            display: block;
            position: absolute;
            border: 10px solid #fff;
            border-color: transparent transparent #fff transparent ;
        }
        .c-comment-input{
            width: 100%;
            padding: 20px 0 20px 0;
            
            textarea{
                width: 94%;
                height: 192px;
                margin: 0 3%;
                line-height: 24px;
                padding:10px;
                border: 1px solid #ddd;
                resize:none;
                overflow:auto;
                word-break:break-all;
            }
            textarea:focus{
                border: 1px solid #E54C53;
            }
            .c-comment-btn{
                width: 100%;
                margin-top: 12px;
                color: #555;
                .c-comment-login{
                    float: right;
                    margin-right: 3%;
                    span{
                        float: left;
                        margin-left: 10px;
                        line-height: 32px;
                    }
                    .c-comment-entry{
                        cursor: pointer;
                    }
                    .c-comment-enroll{
                        cursor: pointer;
                    }
                }
                .c-comment-publish{
                    float: right;
                    margin-right: 3%;
                    padding: 6px 30px;
                    background: #E54C53;
                    color: #fff;
                }
                .isdisabled{
                    background: #999;
                    color: #fff;
                }
            }
            .c-comment-btn:after{
                content: "";
                display: block;
                clear: both;
            }
        }
        .c-comment-content{
            width: 100%;
            .c-comment-h3{
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                margin-left: 3%;
                color: #020202;
            }
            .c-comment-list{
                width: 94%;
                margin: 0 3%;
                display: block;
                padding-bottom: 10px;
                .c-comment-item{
                    width: 100%;
                    padding: 20px 0 0 0 ;
                    border-bottom: 1px dotted #ccc;

                    .c-comment-head{
                        width: 50px;
                        height: 50px;
                        float: left;
                        margin: 10px 0 0 0 ;
                        position: relative;
                        z-index: 2;
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .c-comment-details{
                        float: right;
                        width: 100%;
                        padding-left: 50px;
                        margin-left: -50px;

                        .c-comment-commentInfo{
                            float: left;
                            color: #999;
                            line-height: 30px;
                            
                            a{
                                color: #333;
                                font-size: 14px;
                                font-weight: 400;
                                margin-left: 10px;
                            }
                            a:hover{
                                color: #E54C53;
                                text-decoration: underline;
                            }
                            span{
                                margin-left: 10px;
                                i{
                                    font-style: normal;
                                    font-size: 12px;
                                }
                            }
                        }
                        .c-comment-text{
                            float: left;
                            line-height: 30px;
                            color: #333;
                            margin-left: 10px;
                            a{
                                font-size: 12px;
                                color: #666;
                                font-weight: 400;
                            }
                            a:hover{
                                color: #E54C53;
                                text-decoration: underline;
                            }
                        }
                    }
                    .c-comment-label{
                        float: right;
                        width: 100%;
                        padding-left: 50px;
                        margin: 5px 0 5px -50px;
                        color: #999;
                        font-size: 12px;
                        .c-comment-word{
                            height: 30px;
                            line-height: 30px;
                        
                            .c-comment-time{
                                float: left;
                                margin-left: 10px;
                                
                            }
                            .c-comment-btn2{
                                float: right;
                                position: relative;
                                b{
                                    display: block;
                                    width: 40px;
                                    height: 24px;
                                    line-height: 24px;
                                    text-align: center;
                                    color: red;
                                    border: 1px solid #999;
                                    border-radius: 3px;
                                    position: absolute;
                                    background: #fff;
                                    top: 0;
                                    left: 15px;
                                    opacity: 0.1;
                                    // transition: all 1s ease 0s;
                                }
                                .support-enter-active {
                                    animation: support 1s ease 0s 1 normal both;
                                }
                                @keyframes support{
                                    0%{

                                    }
                                    70%{
                                        opacity: 1;
                                        top: -40px;
                                    }
                                    100%{
                                        opacity: 0;
                                        top: -40px;
                                    }
                                }
                                span{
                                    float: left;
                                    font-style:normal;
                                    margin-left: 10px;
                                    cursor: pointer;
                                    i{
                                        font-style: normal;
                                    }
                                }
                                span:hover{
                                    color:#E54C53;
                                }
                            }
                            .c-comment-btn2:after{
                                content:"";
                                display: block;
                                clear: both;
                            }
                        }
                        .c-comment-input{
                            textarea{
                                height: 46px;
                            }
                        }
                    }
                }
                .c-comment-item:after{
                    content: "";
                    display: block;
                    clear: both;
                }
            }
            .c-comment-loading{
                width: 100%;
                .c-comment-load{
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    span{
                        vertical-align: middle;
                    }
                    i{
                        display: inline-block;
                        vertical-align: middle;
                        width: 22px;
                        height: 22px;
                        background: url(../asset/image/icon_loading.png) no-repeat 0 0 ;
                        margin: 14px 0 0 5px;
                        background-size: 100% 100%;
                    }
                }
                .c-comment-nomore{
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    span{
                        line-height: 50px;
                    }
                }
            }
            .c-comment-more{
                width: 100%;
                height: 41px;
                border-top: 1px solid #E9E9E9;
                .c-comment-moreto{
                    float: left;
                    font-size: 14px;
                    font-weight: 400;
                    margin-left: 3%;
                    line-height: 40px;
                    height: 40px;
                    color: #333;
                }
                .c-comment-moreto:hover{
                    color: #E54C53;
                }
                span{
                    float: right;
                    margin-right: 3%;
                    line-height: 40px;
                    height: 40px;
                    cursor: pointer;
                    position: relative;
                    &:before{
                        content: "";
                        display: block;
                        position: absolute;
                        border: 10px solid #999;
                        border-color: transparent transparent #999 transparent;
                        left: -25px;
                        top: 5px;
                    }
                }

            }
        }
    }                   

</style>
