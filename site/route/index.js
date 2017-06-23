/**
 * 网站首页
 */
"use strict"
var router = require("express").Router()

var axios=require("axios")

router.get("/", function(request, response, next) {
    let data = {
		patentHead:["关键词","专利名称","专利类型","状态","缴费截至日期","价格"],
		patentContent:[],
		patentNewHead:["专利类型","专利名称","时间"],
		patentNewContent:[],
		trademarkContent:[],
		trademarkNewHead:["专利类型","商标名称","时间"],
		trademarkNewContent:[],
		news:{
			newsNav:[],
			dynamics:[]	
		}
	}
	function getPatent() {
	  	return request.http().get("/items",{
	  		params: {
	  			item_class_id_1:1,
	  			limit:10,
	  			sort:"+follow",
	  			fields:"id,attributes,name,keywords,price",
	  		}
	  	});
	}
	function getNewPatent() {
	  	return request.http().get("/items",{
	  		params: {
	  			item_class_id_1:1,
	  			limit:10,
	  			sort:"-shelved_at",
	  			fields:"id,attributes,name,price",
	  		}
	  	});
	}
	function getPatentItemsClass() {
	  	return request.http().get("/item-classes",{
	  		params: {
	  			id:1,
	  			fields:"attributes",
	  		}
	  	});
	}
	function getTrademark() {
	  	return request.http().get("/items",{
	  		params: {
	  			item_class_id_1:2,
	  			limit:8,
	  			sort:"-follow",
	  			fields:"id,name,images,price",
	  		}
	  	});
	}
	function getNewTrademark() {
	  	return request.http().get("/items",{
	  		params: {
	  			item_class_id_1:2,
	  			limit:10,
	  			sort:"-shelved_at",
	  			fields:"id,attributes,name,price",
	  		}
	  	});
	}
	function getTrademarkItemsClass() {
	  	return request.http().get("/item-classes",{
	  		params: {
	  			id:2,
	  			fields:"attributes",
	  		}
	  	});
	}
	function getArticleClassify() {
	  	return request.http().get("/article-categories",{
	  		params: {
	  			parent_id:180,
	  			fields:"name",
	  		}
	  	});
	}
	function getArticleDynamicsList() {
		// ?article_category_id=182
		return request.http().get("/articles",{
	  		params: {
	  			article_category_id:182,
	  			fields:"title,id",
	  		}
	  	});
	}
	function getArticleTechnologyList() {
		// ?article_category_id=182
		return request.http().get("/articles",{
	  		params: {
	  			article_category_id:183,
	  			fields:"title,id",
	  		}
	  	});
	}
	function getArticleInterlocutionList() {
		// ?article_category_id=182
		return request.http().get("/articles",{
	  		params: {
	  			article_category_id:184,
	  			fields:"title,id",
	  		}
	  	});
	}
	axios.all([
			getPatent(),
			getNewPatent(),
			getPatentItemsClass(),
			getTrademark(),
			getNewTrademark(),
			getTrademarkItemsClass(),
			getArticleClassify(), 
			getArticleDynamicsList(),
			getArticleTechnologyList(),
			getArticleInterlocutionList(),
		]).then(axios.spread((patent,NewPatent,patentClass,trademark,newTrademark,trademarkClass,newsNav,articleKnowledge,articleTechnology,articleInterlocution)=> {
	    	// 两个请求现在都执行完成
		    data.patentContent=patent.data
		    data.patentNewContent=NewPatent.data
		    data.patentClass=patentClass.data[0].attributes
		    data.trademarkContent=trademark.data
		    data.trademarkNewContent=newTrademark.data
		    data.trademarkClass=trademarkClass.data[0].attributes
		    data.news.newsNav=newsNav.data
	        data.news.dynamics[0]=articleKnowledge.data
	        data.news.dynamics[1]=articleTechnology.data
	        data.news.dynamics[2]=articleInterlocution.data
	         
		    response.render("index", data)
		    // response.end()
	})).catch(errRes => {
         // console.log(errRes); 
        response.json('系统错误')
    });
    /*
	let data = {
		news:{},
	}
	request.http().get('/items', {
		params: {
			item_class_id: 5,
			page:1,
			"per-page":10
			
		}
	}).then(patentsRes => {
		data.patentContent = patentsRes.data
		return request.http().get('/items', {
			params: {
				item_class_id: 5,
				page:1,
				"per-page":8
			}
		})
	}).then(trademarksRes => {
		data.trademarkContent = trademarksRes.data
		return request.http().get('/article-categories', {
			params: {
				parent_id: 180,
				fields:"name"
			}
		})
	}).then(articleCategoriesRes => {
		data.news.newsNav = articleCategoriesRes.data
		return request.http().get('/articles', {
			params: {
				article_category_id: 180
			}
		})
	}).then(articlesRes => {
		data.news.dynamics = articlesRes.data
		response.render("index/index", data)
	})
	*/
})

module.exports = router