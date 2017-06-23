<template>
    <div class="c-search-box" >
        <form v-bind:action="action">
            <select name="" id="" v-model="selected" v-on:change="onChangeSelect">
                <option v-bind:value="item.val" v-for="(item,index) in optList" v-text="item.name" ></option>
            </select> 
            <input v-model.trim="message" class="c-search-txt" type="text" v-bind:placeholder="optList[select].placeholder" v-on:focus="searchKey" v-on:keyup="searchKey" v-on:click.stop>
            <input class="c-search-btn" type="submit" value="搜一下" v-on:click.stop.prevent="submitSearch">
        </form>
        <div class="c-search-hot" v-if="isNeedHot">
            <a v-for="(item,index) in optHot" v-bind:href="item.urls"  class="c-search-a">{{item.keywords}}</a>
        </div>
        <ul class="c-search-content" v-if="isNeedBox" v-show="isShow">
            <li v-on:click="setInput(index)" class="c-search-list" v-for="(item,index) in searchMsg">
                <span v-if="newShow">{{index+1}}</span>
                <a v-bind:href="item.urls">{{item.name}}</a>
                <em v-if="newShow">{{item.follow}}人查看</em>
            </li>
        </ul>
    </div>
</template>

<script>

    import axios from "axios"

	export default {
		name:"tq-search",
        props:{
            action:{
                type:String,
                required: true,
            },
            actionList:{
                type:String,
                required: true,
            },
            searchAddress:{
                type:String,
                required: true,
            },
            isNeedBox:{
                type:Boolean,
                // required: true,
                default: false,
            },
            isNeedHot:{
                type:Boolean,
                // required: true,
                default: false,
            },
            isNeedNew:{
                type:Boolean,
                // required: true,
                default: false,
            },
            optList:{
                type: Array,
                // required: true,
            },
        },
        created () {
            if(window.location.pathname=="/trademark"){
                this.selected=this.optList[1].val;
                this.select=1;
            }else{
                this.selected=this.optList[0].val;  
                this.select=0;
            }
            this.getInitHot();
            this.getOptionObj();
        },
		mounted: function () {

            this.$nextTick(function () {
                var _this=this;
                document.body.addEventListener("click",function(event){
                    
                    if(_this.isShow){
                        _this.isShow=false;
                    }
                    
                });
            });
            
        },
        data: function () {
            return {
            // 配置信息
	         // action: this.myaction,                 //请求地址
             //    isNeedBox: this.myisneedbox,         //是否需要查询框
             //    isNeedHot: this.myisneedhot,         //是否显示热门
             //    isNeedNew: this.myisneednew,         //是否文本框获得焦点显示默认信息
             //    optList: this.myoptlist,             //搜索框模糊查询列表数据
             //    optHot: this.myopthot,               //搜索框下方最热们数据列表
             //    optNew: this.myoptnew,               //搜索框列表初始化显示最新数据列表
             

                //内置参数
                optHot:[],
                selected: null,                 //v-model绑定opction
                select: 0,                      //默认opction选中
                message: null,                  //搜索框绑定信息
                isShow: false,                  //模糊查询框是否显示
                searchMsg: [],                  //模糊查询数据
                newShow: true,                  //初始化搜索列表显示数字和查看次数
	        }
        },
        computed:{
            
        },
        watch: {
            // 如果 question 发生改变，这个函数就会运行
            // selected: function (newSelected) {
            //     for (var i = 0; i < this.optList.length; i++) {
            //         if(this.optList[i].val==newSelected){
            //             this.select=i;
            //             this.getInitHot();
            //         }
            //     }
            // }
        },
        methods: {
            onChangeSelect:function () {
                for (var i = 0; i < this.optList.length; i++) {
                    if(this.optList[i].val==this.selected){
                        this.select=i;
                        this.getInitHot();
                    }
                }
            },
            // 关键字查询显示查询列表？
            searchKey:function () {
                //是否需要搜索列表
                if(this.isNeedBox){
                    this.isShow=false;           //显示列表框

                    if(this.message!=null && this.message.length>0){

                        this.newShow=false;         //隐藏数字和查看次数
                    }else{
                        //显示推荐列表
                        
                        this.newShow=true;         //显示数字和查看次数
                    }
                    
                    this.getAjaxData();
                }
            },
            //点击显示推荐查询
            // searchFocus:function () {
               
            //     if(this.isNeedNew){//是否显示推荐列表
            //         this.isShow=true;
            //         this.newShow=true;         //显示数字和查看次数
            //         this.getAjaxData();
            //     }
            // },
            //点击查询列表显示到搜索框中并隐藏
            setInput:function (index) {
                
                this.message=this.searchMsg[index].txt;
                this.isShow=false;
                this.submitSearch();
            },
            // 异步获取数据并添加到搜索列表 推荐列表和关键字搜索列表
            getAjaxData:function(){
               
                var pathname,params;

                if(this.select==0){

                    pathname="/"+this.optList[0].val;
                    params={
                        item_class_id_1:1,   
                        limit:9,
                        fields:"id,name,follow",
                    }
                    
                }else if(this.select==1){
                    //商标
                    pathname="/"+this.optList[1].val;
                    params={
                        item_class_id_1:2,   
                        limit:9, 
                        fields:"id,name,follow",
                    }
                }
                if(this.message!=null  && this.message.length>0){    
                    // if(this.select==0){
                        params.q={
                                keywords:"~"+this.message
                            };  
                        
                    // }else if(this.select==1){
                    //     //商标
                    //     params.keywords="~"+this.message; 
                    // }
                }else{
                    if(!this.isNeedNew){
                        return false;
                    }
                }
                axios.get(this.action, {
                    params: params,
                }).then(response=> {
                    this.searchMsg=[];
                    if(response.data.length!=0){
                        for (var i = 0; i < response.data.length; i++) {
                            this.searchMsg.push({
                                "name":response.data[i].name,
                                "urls":pathname+"/"+response.data[i].id,
                                "follow":response.data[i].follow
                            });
                        }
                        this.isShow=true; 
                    }
                }).catch(error=> {
                    console.log(error)
                });
            },
            //点击提交查询并跳转
            submitSearch:function () {
                
                var msg=this.message;
                var typeKey
                if(msg!=null && msg.length>0){
                    if(this.select==0){
                        //专利
                        typeKey="/patent";
                        
                    }else if(this.select==1){
                        //商标
                        typeKey="/trademark";
                    }
                    // http://site.tqtest.com/patent
                    var url=this.searchAddress+typeKey+"?keywords=~"+msg;
                    
                    window.location=url;
                }
                
            },
            //获取hot导航
            getInitHot:function () {
                var pathname,params
                if(this.select==0){

                    pathname="/"+this.optList[0].val;
                    params={
                        parent_id:1,   
                        limit:6,
                        fields:"keywords,id",
                        // sort:"-id",
                    }
                    
                }else if(this.select==1){
                    //商标
                    pathname="/"+this.optList[1].val;
                    params={
                        parent_id:2,   
                        limit:6,
                        fields:"keywords,id", 
                        // sort:"-id",
                    }
                }
                axios.get(this.actionList,{
                    params: params,
                }).then(response=> {
                    this.optHot=[];
                    for (var i = 0; i < response.data.length; i++) {
                       this.optHot.push({
                            "keywords":response.data[i].keywords[0],
                            "urls":pathname+"?item_class_id="+response.data[i].id
                        });
                    }
                }).catch(error=> {
                    
                });
            },
            getOptionObj:function () {

                //获取专利总数
                axios.get(this.action,{
                    params: {
                        item_class_id_1:1,  //[3,10] 专利1 商标2
                        // fields:"id",
                    }
                }).then(response=> {
                    // console.log(response)
                    if(response.headers["x-pagination-total-count"]){
                        this.optList[0].placeholder="从"+response.headers["x-pagination-total-count"]+"个专利中查找";
                    }
                });
                //获取商标总数
                axios.get(this.action,{
                    params: {
                        item_class_id_1:2,  //[3,10] 专利1 商标2
                        // fields:"id",
                    }
                }).then(response=> {
                    // console.log(response)
                    if(response.headers["x-pagination-total-count"]){
                        this.optList[1].placeholder="从"+response.headers["x-pagination-total-count"]+"个专利中查找";
                    }
                });
            },    
        }
	}
</script>
<style lang="less">
    
    @hover-color:#E54C53; 
    .c-search-box{
        display: inline-block;
        width: 100%;
        text-align: center;
        margin: 15px auto;
        position: relative;
        select{
            width: 80px;
            height: 40px;
            line-height: 40px;
            option{
                padding: 10px 0;
            }
        }
        select:focus{
            // border: 1px solid #e54c53;
        }
        .c-search-txt{
            border: 1px solid #999;
            line-height: 40px;
            height: 40px;
            width: 360px;
            text-indent: 10px;
            font-size: 14px;
            line-height: 28px;
            color: #666;
        }
        .c-search-txt:focus{
            // border: 1px solid #e54c53;
        }
        .c-search-btn{
            padding: 0 20px;
            line-height: 40px;
            height: 40px;
            background: #fff;
            color: #333;
            border: 1px solid #999;
            // border: 1px solid #e54c53;
            transition: all 0.5s ease 0s;
        }
        .c-search-btn:hover{
            border: 1px solid #e54c53;
            background: #e54c53;
            color: #fff;
        }
        .c-search-hot{
            width: 530px;
            height: 30px;
            margin:0 auto;
            // position: absolute;
            // top: 40px;
            // left: 50%;
            // margin-left: -180px;
            .c-search-a{
                float: left;
                line-height: 30px;
                margin-right: 12px;
                color:#999;
            }
            .c-search-a:hover{
                color:@hover-color;
            }
        }
        .c-search-content{
            width: 360px;
            display: block;
            border: 1px solid #999;
            // height: 300px;
            // overflow: hidden;
            position: absolute;
            top: 39px;
            left: 50%;
            margin-left: -181px;
            background: #fff;
            padding: 5px 0;
            .c-search-list{
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 0px 5px 0px 13px;
                text-align: left;
                color:#333;
                cursor: pointer;
                span{
                    float: left;
                    display: block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                    margin: 5px 5px 0 0;
                    border-radius: 3px;
                    background: #7cbce4;
                    color: #fff;
                }
                a{
                    font-weight: 400;
                    float: left;
                    display: block;
                    color: #333;
                    width: 240px;
                    height: 100%;
                    line-height: 30px;
                    overflow: hidden;
                }
                em{
                    font-style: normal;
                    float: right;
                    display: block;
                    font-size: 12px;
                    color: #999;
                }
            }
            .c-search-list:nth-child(1) span{
                background: @hover-color;
            }
            .c-search-list:nth-child(2) span{
                background: #fcbc4b;
            }
            .c-search-list:nth-child(3) span{
                background: #a1d958;
            }
            .c-search-list:hover{
                background: #f0f0f0;
            }
        }
    }    
        
</style>