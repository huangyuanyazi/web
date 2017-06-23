/**
 * 商品详情
 */
"use strict"

let router = require("express").Router()
var axios=require("axios")

let Pagination = require("../widget/pagination")

router.get("/patent", function(request, response, next) {
    let currentPage = request.query._page; // 当前页码
    let pageSize = 2; // 每页记录数
    let queryObj=request.query; 

    let data = {};
    let item_class_id;
    let item_class_id_1=1;   //专利1  商标2
    
    //判断查询是否为全部
    if(!request.query.item_class_id){
        // queryObj.item_class_id_1=1;
        queryObj.item_class_id="[3,10]";
    }else{
        item_class_id=request.query.item_class_id;
    }

    // 时间查询转换
    if(queryObj["attributes:deadline"]){
        let date= new Date().getTime();
        queryObj["attributes:deadline"]=">"+(date-queryObj["attributes:deadline"]*1000*60*60*24);
    }

    // 关键字模糊查询
    if(queryObj["keywords"]){
        queryObj.q={
            keywords:queryObj["keywords"]
        }
        delete queryObj["keywords"] 
    }
    // 分页
    queryObj.page=currentPage ? currentPage : 1;
    queryObj["per-page"]=pageSize;
    
    // 专利attributes属性
    function getPatentItemsClass() {
        return request.http().get("/item-classes",{
            params: {
                id:1,     //1是专利  2是商标
                fields:"attributes",
            }
        });
    }
    // 热门专利list
    function getPatentHotList() {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-30
                limit:3,
                sort:"-follow",   //follow是关注度
                fields:"id,name,price,images",
            }
        });
    }
    // 专利分类名称
    function getPatentClassesTree() {
        return request.http().get("/item-classes",{
            params: {
                parent_id:1,  //parent_id 专利1 商标2
                fields:"id,name",
                limit:100,
            }
        });
    }
    // 分页
    function paginationHtml() {
        return request.http().get('/items', {
            params: queryObj
        })
    }
    axios.all([
            getPatentItemsClass(),
            getPatentHotList(),
            getPatentClassesTree(),
            paginationHtml(),
        ]).then(axios.spread((classes,hot,tree,paginations)=> {
            //请求现在都执行完成
            let totalCount = paginations.headers['x-pagination-total-count']
                
            let address="";
                
                if(!queryObj["_page"]){
                    currentPage=1;
                }
            let pagination = new Pagination(totalCount, currentPage, pageSize);

                for(var key in queryObj){
                    
                    if(key=="page" || key=="per-page" || key=="_page" ){
                       
                    }else{
                        
                        address+="&"+key+"="+request.query[key];
                    }
                }
                
                address="?"+address.substr(1);
                data.pagination = pagination.getHtml("/patent"+address);
                
                data.item_class_id=item_class_id;
                // data.item_class_id_1=item_class_id_1;
                data.totalCount=totalCount;

                data.patentClasses=classes.data[0].attributes
                data.patentHotList=hot.data
                data.patentClassesTree=tree.data

                data.patentList=paginations.data
                // console.log(data.patentList)
                response.render("patent-index", data)
    })).catch(errRes => {
         //console.log(errRes); 
        response.json('系统错误')
    });
})

router.get("/trademark", function(request, response, next) {
    
    let data = {}
    let item_class_id;
    let item_class_id_1=2;
    let queryObj=request.query

    if(!request.query.item_class_id){
        queryObj.item_class_id_1=2;
    }else{
        item_class_id=request.query.item_class_id;
    }

    // 时间查询转换
    if(queryObj["attributes:regDate"]){
        let date= new Date().getTime();
        queryObj["attributes:regDate"]=">"+(date-queryObj["attributes:regDate"]*1000*60*60*24);
    }
    if(queryObj["keywords"]){
        queryObj.q={
            keywords:~queryObj["keywords"]
        }
        delete queryObj["keywords"] 
    }
    //添加查询条件
    queryObj.limit=12      
    // console.log(request.query)
    // 商标list
    function getTrademarkList() {
        
        return request.http().get("/items",{
            params: queryObj
        });
    }
    // 商标热门list
    function getTrademarkHotList(argument) {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-55
                limit:3,
                sort:"-follow",   //follow是关注度
                fields:"id,name,price,images",
            }
        });
    }
    // 商标的分类名称
    function getTrademarkClassesTree() {
        return request.http().get("/item-classes",{
            params: {
                parent_id:2,  //parent_id 专利1 商标2
                fields:"id,name",
                limit:60,
            }
        });
    }
    axios.all([
            getTrademarkList(),
            getTrademarkHotList(),
            getTrademarkClassesTree(),
        ]).then(axios.spread((list,hot,tree)=> {
            //请求现在都执行完成
            let totalCount = list.headers['x-pagination-total-count'];
            data.item_class_id=item_class_id;
            data.totalCount=totalCount;
            
            data.trademarkList=list.data;
            data.trademarkHotList=hot.data;
            data.trademarkClassesTree=tree.data;
            // console.log(data.trademarkList); 
            response.render("trademark-index", data);
    })).catch(errRes => {
         // console.log(errRes); 
        response.json('系统错误')
    });
});

router.get("/patent/:id", function(request, response, next) {
    let data = {}
    let browseLog="";
    let item_class_id_1=1;
    request.headers.cookie && request.headers.cookie.split(';').forEach(function(Cookie) {
        var parts = Cookie.split('=');
        if(parts[0].trim()=="browseLog"){
            browseLog=decodeURI((parts[1] || '').trim());
        }
        // console.log(browseLog)
    });

    //专利详情
    function getPatentDetails() {
        return request.http().get("/items",{
            params: {
                id:request.params.id
            }
        });
    }
    // 专利attributes属性
    function getPatentItemsClass() {
        return request.http().get("/item-classes",{
            params: {
                id:1,     //1是专利  2是商标
                fields:"attributes",
            }
        });
    }
    // 专利分类名称
    function getPatentClassesTree() {
        return request.http().get("/item-classes",{
            params: {
                parent_id:1,  //parent_id 专利1 商标2
                fields:"id,name",
                limit:100,
            }
        });
    }
    // 专利cookie列表
    function getPatentBrowsed() {
        return request.http().get("/items",{
            params: {
                name:"("+browseLog+")",
                limit:3,  
                sort:"-follow",  
                fields:"id,name,price,images",  
            }
        });
    }
    // 专利new列表
    function getPatentNewList() {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-55
                limit:4,
                sort:"+follow",   //follow是关注度
                fields:"id,name,price,images",  
                
            }
        });
    }
    // 专利hot列表
    function getPatentHotList() {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-55
                limit:4,
                sort:"-follow",   //follow是关注度
                fields:"id,name,price,images",
            }
        });
    }
    axios.all([
            getPatentDetails(),
            getPatentItemsClass(),
            getPatentClassesTree(),
            getPatentBrowsed(),
            getPatentNewList(),
            getPatentHotList(),
        ]).then(axios.spread((details,classes,tree,browsed,news,hot)=> {
            //请求现在都执行完成
            
            data.patentDetails=details.data[0];
            data.patentClasses=classes.data[0].attributes;
            data.patentClassesTree=tree.data;
            data.patentBrowsed=browsed.data;
            data.patentNewList=news.data;
            data.patentHotList=hot.data; 
            response.render("patent-detail", data);
    })).catch(errRes => {
         // console.log(errRes); 
        response.json('系统错误')
    });
})

router.get("/trademark/:id", function(request, response, next) {
    let data = {};
    let browseLog="";
    let item_class_id_1=2;
    request.headers.cookie && request.headers.cookie.split(';').forEach(function(Cookie) {
        var parts = Cookie.split('=');
        if(parts[0].trim()=="browseLog"){
            browseLog=decodeURI((parts[1] || '').trim());
        }
    });

    // 商标详情
    function getTrademarkDetails() {
        return request.http().get("/items",{
            params: {
                id:request.params.id
            }
        });
    }
    // 商标attributes属性
    function getTrademarkItemsClass() {
        return request.http().get("/item-classes",{
            params: {
                id:2,     //1是专利  2是商标
                fields:"attributes",
            }
        });
    }
    // 商标的分类名称
    function getTrademarkClassesTree() {
        return request.http().get("/item-classes",{
            params: {
                parent_id:2,  //parent_id 专利1 商标2
                fields:"id,name",
                limit:100,
            }
        });
    }
    // 商标cookie列表
    function getTrademarkBrowsed() {
        return request.http().get("/items",{
            params: {
                name:"("+browseLog+")",
                limit:3,  
                sort:"-follow",  
                fields:"id,name,price,images",  
            }
        });
    }
    // 商标new列表
    function getTrademarkNewList() {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-55
                limit:4,
                sort:"-shelved_at",   //follow是关注度
                fields:"id,name,price,images",  
                
            }
        });
    }
    // 商标热门list
    function getTrademarkHotList() {
        return request.http().get("/items",{
            params: {
                item_class_id_1:item_class_id_1,  // 专利3-10 商标11-55
                limit:4,
                sort:"-follow",   //follow是关注度
                fields:"id,name,price,images",  
                
            }
        });
    }
    axios.all([
            getTrademarkDetails(),
            getTrademarkItemsClass(),
            getTrademarkClassesTree(),
            getTrademarkBrowsed(),
            getTrademarkNewList(),
            getTrademarkHotList(),
        ]).then(axios.spread((details,classes,tree,browsed,news,hot)=> {
            //请求现在都执行完成
            data.trademarkDetails=details.data[0];
            data.trademarkClasses=classes.data[0].attributes;
            data.trademarkClassesTree=tree.data;
            data.trademarkBrowsed=browsed.data;
            data.trademarkNewList=news.data;
            data.trademarkHotList=hot.data;
            response.render("trademark-detail", data);
    })).catch(errRes => {
         // console.log(errRes); 
        response.json('系统错误')
    });
});

router.post("/items", function(request, response, next) {
    console.log(request.body)
    console.log(request.headers)
    console.log(request.path)
    console.log(request.query)
    response.end("complete")
})

module.exports = router