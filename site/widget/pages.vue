<template>
	<div class="c-article-pages" id="c_article_pages" v-if="pages>1">
	    <span class="c-pages-prev5" v-on:click="pageNum($event)" v-if="page>showPageNumber-1">上{{showPageNumber}}页</span>
	    <span class="c-pages-prev" v-bind:class="{disable:page==0}" v-on:click="pageNum($event)">上一页</span>
	    <span class="c-pages-nums" v-bind:class="{active:index==indexs}" v-on:click="pageNum($event,index,num)"  v-for="(num,index) in showPageNumber"  v-text="num" ></span>
	    
	    <span class="c-pages-next" v-bind:class="{disable:page==pages-1}" v-on:click="pageNum($event)" >下一页</span>
	    <span class="c-pages-next5" v-on:click="pageNum($event)" v-if="page<pages-showPageNumber">下{{showPageNumber}}页</span>
	</div>
</template>

<script>
    import { vmhtml } from "widget/bus.js"
    import axios from "axios"
	export default {
		name:"tq-page",
        props:{
            //一页显示多少条文章列表
            pageSize:{                 
                type:Number,
                default: 10,
            },
            //显示页码[5,10,15,20]
            showPageNumber:{               
                type:Number,
                //自定义验证
                validator: function(value){
                    return value<=20 && value%5==0
                },
                default: 5,
            },
        },
        created: function(){
            
            axios.get("http://127.0.0.1:9093/articles").then(res => {

                var len=res.data.articleList[this.tabIndex].contents.length
                
                this.pages=Math.ceil(len/this.pageSize)
            })
        },
		mounted: function () {

        },
       data: function () {
            return {
                // 分页配置信息
                // pageSize:this.pageSize,                  //接受传入一页显示条数
	            // showPageNumber:this.showPageNumber,  //接受传入显示页数[5,10,15,20]

                //内置参数
                pages:null,                                    //接受传入总页数
	            page:0,                                        //当前选中页数
	            indexs:0,		                               //当前选中位置
                tabIndex:0,	                                   //列表页索引  
	        }
        },
        watch:{

        },
        computed:{

			
        },
        methods: {
            initPage:function(){
                //初始化page和向文章列表传递页码使列表初始化
                var el = this.$el;
                var list = el.getElementsByClassName('c-pages-nums');
                this.page=0;
                this.indexs=0;
                for (var i = 0; i < this.showPageNumber; i++) {
                               
                    list[i].innerHTML=i+1;
                } 
            },
            pageNum: function(event,index){
                // 选择页码
                var event= event || window.event;
             
                    // event.target= event.target || event.srcElement;
                var pages=this.pages;
                var showPageNumber=this.showPageNumber;
                var el = this.$el;
                var list = el.getElementsByClassName('c-pages-nums');
                
                if(event.target.className=="c-pages-nums"){
                   // 点击数字事件
                    this.page = list[index].innerHTML-1;
                    this.indexs=index;

                }else if(event.target.className=="c-pages-prev"){
                    // 点击上一页事件
                    if(this.page>0){

                        this.page--; 

                        if( this.indexs==0){
                            for (var i = 0; i < showPageNumber; i++) {
                               
                                list[i].innerHTML--;
                            }    
                        }else{
                            this.indexs--;
                        }
                    }else{
                        
                    }
                }else if(event.target.className=="c-pages-next"){
                      // 点击下一页事件
                    if(this.page<pages-1){
                        
                        this.page++; 
                            
                        if( this.indexs==showPageNumber-1){

                            for (var i = 0; i < showPageNumber; i++) {

                                list[i].innerHTML++; 
                            }
                           
                        }else{
                            this.indexs++;
                        }
                    }else {
                        
                    }

                }else if(event.target.className=="c-pages-prev5"){
                    // 点击上五页事件
                    
                    this.page = this.page-showPageNumber >0 ? this.page-showPageNumber : 0; 

                        if(this.page!=0 && (this.page-this.indexs)>0){
                            for (var i = 0; i < showPageNumber; i++) {
                               
                                list[i].innerHTML=parseInt(list[i].innerHTML)-showPageNumber;
                            }
                        }else{
                            for (var i = 0; i < showPageNumber; i++) {
                           
                                list[i].innerHTML=i+1;
                            } 
                            this.indexs=this.page%showPageNumber;
                        }    
                    
                }else if(event.target.className=="c-pages-next5"){
                     // 点击下五页事件
                    
                    this.page = this.page+showPageNumber<pages? (this.page+showPageNumber) : (pages-1); 
                    
                        if((this.page+(showPageNumber-1-this.indexs))<pages){
                            for (var i = 0; i < showPageNumber; i++) {
                               
                                list[i].innerHTML=parseInt(list[i].innerHTML)+showPageNumber;
                            }
                        }else{
                            for (var i = showPageNumber - 1; i >= 0; i--) {
                                list[i].innerHTML=pages--;
                            }
                            this.indexs=(this.page+1)%showPageNumber
                        }
                    
                }  
                this.pageCont();
            },
            pageCont:function(){
                
                if(this.page>=0 && this.page<this.pages){
                    vmhtml.$emit("changePage",this.page+1)
                }
                
            },
            
        }
	}
</script>

<style lang="less">
    // 分页效果样式
    .c-article-pages{
        width: 100%;
        height: 40px;
        text-align: center;
        margin-top: 20px;
        span{
            height: 30px;
            line-height: 30px;
            color: #333;
            margin-right: 3px;
            padding: 7px 14px;
            border: 1px solid #d7d7d7;
            border-radius: 2px;
            cursor: pointer;
            background-color: #f5f5f5;
            text-decoration: none;
            transition: all 0.5s ease 0s;
        }
        span:hover{
            background: #E54C53;
            color: #fff;
            border: 1px solid #E54C53;
        }
        span.disable{
            background: #fff;
            color: #ccc;
            border: 1px solid #e4e4e4;
            cursor: text;
        }
        span.active{
            background: #E54C53;
            color: #fff;
            border: 1px solid #E54C53;
        }
    }
</style>