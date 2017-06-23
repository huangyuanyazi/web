/**
 * 文章资讯
 */
"use strict"

let router = require("express").Router()

let axios=require("axios")

let Pagination = require("../widget/pagination")
 
router.get("/article", function(request, response, next) {
    let currentPage = request.query._page // 当前页码
    let pageSize = 2 // 每页记录数
        
    let article_category_id=request.query.article_category_id
    let data={
            articleNav:[],
            // articleList:[]
        }
    
        if(!article_category_id){
            article_category_id="(182,183,184)";
        }

    function getPaginations() {
        return request.http().get('/articles', {
            params: {
                'page': currentPage ? currentPage : 1,
                'per-page': pageSize,
                'article_category_id':article_category_id
            }
        })
    }
    function getArticleClassify() {
        return request.http().get("/article-categories",{
            params: {
                parent_id:180,
                fields:"name,id",
            }
        });
    }
    function getArticleRecommend() {
        return request.http().get("/articles",{
            params: {
                limit:4,
                fields:"title,id,created_at,keywords",
                sort:"-hits",
                'article_category_id':article_category_id,
            } 
        });
    }
    axios.all([
            getPaginations(),
            getArticleClassify(), 
            getArticleRecommend(),
            
        ]).then(axios.spread( (paginations,classify,recommend)=> {
             // 两个请求现在都执行完成
            let totalCount = paginations.headers['x-pagination-total-count']
            let pagination = new Pagination(totalCount, currentPage, pageSize)
            
            if(!request.query.article_category_id){

                data.pagination = pagination.getHtml("/article")
            }else{

                data.pagination = pagination.getHtml("/article?article_category_id="+article_category_id)
            }
            // data.currentTime = (new Date().getTime()) / 1000
            data.articleList=paginations.data
            
            data.articleNav=classify.data
            data.articleRecommend=recommend.data
            
            response.render("article-index", data)
    })).catch(errRes => {
            console.log(errRes)
            response.json('系统错误')
    });
})

router.get("/article/:id", function(request, response, next) {
     
    let data={
            articleClassify:[],
            articleContent:{},
            articleHot:[],
            articleNew:[],
            articlePrev:{},
            articleNext:{},
        } 
    // 文章分类信息
    function getArticleClassify() {
        return request.http().get("/article-categories",{
            params: {
                parent_id:180,
                fields:"name,id",
            }
        });
    }
    // 文章详情
    function getArticleContent() {
        return request.http().get("/articles",{
            params: {
                id:request.params.id,
            }
        });
    }
    // 文章热门
    function getArticleHot() {
        return request.http().get("/articles",{
            params: {
               sort:"-hits",
               limit:9,
               fields:"title,id",
            }
        });    
    }
    // 文章最新
    function getArticleNew() {
        return request.http().get("/articles",{
            params: {
               sort:"+hits",
               limit:9,
               fields:"title,id",
            }
        });
    }
    // 文章上一个
    function getArticlePrev() {
        var id=request.params.id-1;

        return request.http().get("/articles",{
            params: {
                id:"<"+request.params.id,
                fields:"title,id",
                article_category_id:"(182,183,184)",
                limit:1,
            }
        });
    }
    // 文章下一个
    function getArticleNext() {
        return request.http().get("/articles",{
            params: {
                id:">"+request.params.id,
                fields:"title,id",
                article_category_id:"(182,183,184)",
                limit:1,
            }
        });
    }
    axios.all([
            getArticleClassify(),
            getArticleContent(),
            getArticleHot(),
            getArticleNew(),
            getArticlePrev(),
            getArticleNext(),
        ]).then(axios.spread((classify,content,hots,news,prevs,nexts)=> {
            // 两个请求现在都执行完成
                      
            data.articleClassify=classify.data;
            data.articleContent=content.data[0];
            data.articleHot=hots.data
            data.articleNew=news.data
            data.articlePrev=prevs.data[0]
            data.articleNext=nexts.data[0]
            console.log(data.articlePrev) 
            console.log(data.articleNext)  
            response.render("article-detail", data)
    })).catch(errRes => {
        console.log(errRes)  
        response.json('系统错误')
    });
})

module.exports = router

/*
let actions = {}

//文章首页
actions["GET/"] = response => {
    let data = {}

    response.render("article/index", data)
}

//文章详情
actions["GET/:id"] = function(response) {
    let id = this.params
    let data = {
        id: id,
        title: "文章标题"
    }
    response.render("article/detail", data)
}

//发布评论
actions["POST/comment"] = response => {

}

module.exports = actions
*/