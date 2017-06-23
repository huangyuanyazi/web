/**
 * index.js
 * 商标首页的相关js代码
 */
//导入filter.js中方法
import handleFilter from './filter.js'
Template7.registerHelper('jsonTrademark', function (condition, options) {
    let value = JSON.parse(condition)
    let key = options.hash.key
    switch (key) {
        case'type':
            switch (value[options.hash.key]) {
                case 0:
                    return "文字商标"
                    break;
                case 1:
                    return "图形商标"
                    break;
                default:
                    break;
            }
            break;
        default:
            return value[options.hash.key]
            break;
    }
})
Template7.registerHelper('joinString', function (condition, options) {
    let value = JSON.parse(condition);
    return value.join(options.hash.delimiter)

})
Template7.registerHelper('jsonObj', function (condition, options) {
    let value = JSON.parse(condition);
    console.log(value)
    console.log(value instanceof Array)
    console.log(options)
    // console.log(value[0])
    return value

})
export default {
    pageInit (app, page) {
        //模板编译
        let listTemplate = Template7.compile($$("#trademarkTemplate").html())
        //请求参数
        let param = {"per-page": 5, "item_class_id_1": 2, "page": 1}
        let query = page.query
        /**
         * 处理从搜索页面分类栏传入的参数
         */
        if (query.hasOwnProperty('sort')) {
            let sortParam = query.sort;
            param.trademarkSort = sortParam;
            console.log('商标--分类查询参数--' + sortParam)
        }
        /**
         * 处理从搜索页面搜索栏传入的参数
         */
        if (query.hasOwnProperty('search')) {
            let search = query.search;
            console.log('商标--search input查询参数--' + search)
        }
        /**
         * 页面初始化
         */
        $$.getJSON(config.api.url + "/items", param, (data, status, xhr) => {
            console.log(data)
            $$("#trademarkUl").html(listTemplate({trademark: data}));
            let totalCount = xhr.getResponseHeader('x-pagination-total-count')
            if (totalCount <= 5) {
                $$('#trademarkInfinitePreloader').remove()
            }
        })
        //筛选栏
        handleFilter('c-layer-show84')
        //筛选栏的原始数据
        const trademarkTypeDefaultText = $$("#trademarkTypeFilter span").text()
        const trademarkPriceDefaultText = $$("#trademarkPriceRangeFilter span").text()
        const trademarkSortDefaultText = $$("#trademarkSortMethodFilter span").text()
        //排序各项的点击次数，根据奇偶来判断是升序还是降序
        let trademarkPriceRangeClickCount = 0;
        let trademarkHotClickCount = 0;
        let trademarkReleaseTimeClickCount = 0;
        /**
         * 筛选栏各项点击事件
         */
        $$('#trademarkPage').on('click', '.c-trademarkEjectItem', function (e) {
            //清除各遮罩层和筛选栏的选中状态
            removeAllEject()
            removeAllChosen()
            //遮罩层各项文字
            // let clickedItem = this.querySelector('.item-title').innerText
            //清除字符串首尾空格
            // clickedItem = trim(clickedItem);
            //取出所点击的各项data属性中的值
            let dataID = this.dataset.filterId
            let filterData = this.dataset.filterData
            //取出选中项的data-filter数据
            let filterSelector = this.dataset.filterSelector
            let filterShow = this.dataset.filterShow
            filterSelector = filterSelector.replace('#', '')
            document.getElementById(filterSelector).querySelector('span').innerText = filterShow
            /**
             * 判断点击项的dataID,修改筛选栏文字，把dataID作为筛选条件加入到param参数
             */
            switch (true) {
                case dataID == 'trademarkTypeCharacter' || dataID == 'trademarkTypeImage':
                    param["attributes->type"] = filterData
                    break;
                case dataID == 'trademarkPriceRangeUnder1000' || dataID == 'trademarkPriceRange1000To2000' || dataID == 'trademarkPriceRange2000To3000' || dataID == 'trademarkPriceRange3000To5000' || dataID == 'trademarkPriceRange5000To10000' || dataID == 'trademarkPriceRange10000To50000' || dataID == 'trademarkPriceRangeAbove50000':
                    param["price"] = filterData
                    break;
                case dataID == "trademarkSortReleaseTime"||dataID == "trademarkSortPopularity"||dataID == "trademarkSortPrice" :
                    param["sort"]=filterData
                    break;
                case dataID == "trademarkTypeDefault":
                    delete param["attributes->type"]
                    break;
                case dataID == "trademarkPriceRangeDefault":
                    delete param["price"]
                    break;
                case dataID == "trademarkSortDefault":
                    delete param["sort"]
                    break
            }
            //初始化_page
            param.page = 1;
            /**
             * 根据所选条件向服务器请求数据
             */
            $$.getJSON(config.api.url + "/items", param, (data, status, xhr) => {
                //修改_page,用在滚动事件中
                param.page = 2;
                //数据总条数
                let totalCount = xhr.getResponseHeader('x-pagination-total-count')
                console.log('总数------' + totalCount)
                $$("#trademarkUl").html(listTemplate({trademark: data}));
                //滚动容器置顶
                $$('#trademarkPageContent').scrollTop(0)
                /**
                 * 根据数据条数判断是否需要添加修改preloader样式
                 */
                if (totalCount == 0) {
                    console.log('data=0')
                    //销毁滚动事件
                    app.detachInfiniteScroll($$('#trademarkPageContent'))
                    if ($$('#trademarkPageContent').find('#trademarkInfinitePreloader').length == 0) {
                        $$('#trademarkPageContent').append('<div class="infinite-scroll-preloader" id="trademarkInfinitePreloader">对不起,没有您想要的内容</div>')
                        console.log('数据--0', 'preloader--0', '添加preloader')
                    } else {
                        $$('#trademarkInfinitePreloader').html('对不起,没有您想要的内容')
                        console.log('数据--0', 'preloader--1', '修改preloader')
                    }
                } else if (totalCount > 0 && totalCount <= 5) {
                    //销毁滚动事件
                    app.detachInfiniteScroll($$('#trademarkPageContent'))
                    console.log('0<data<=5')
                    if ($$('#trademarkPageContent').find('#trademarkInfinitePreloader').length !== 0) {
                        $$('#trademarkInfinitePreloader').remove()
                        console.log('0<data<=5', '移除preloader')
                    }
                } else {
                    console.log('data>5')
                    //开启滚动事件
                    app.attachInfiniteScroll($$('#trademarkPageContent'))
                    if ($$('#trademarkPageContent').find('#trademarkInfinitePreloader').length == 0) {
                        $$('#trademarkPageContent').append('<div class="infinite-scroll-preloader" id="trademarkInfinitePreloader"><div class="preloader"></div></div>')
                        console.log('data>5', 'preloader--0', '添加preloader')
                    } else {
                        $$('#trademarkInfinitePreloader').html('<div class="preloader"></div>')
                    }
                }


            })
        })
        //加载与否的开关
        let loading = false;
        //初始化页面时，滚动事件的初始_page
        param.page = 2;
        //每次加载的条数
        let perCount = 5;
        //数据总量
        let totalCount = 0;
        /**
         * 无限滚动事件
         */
        $$('#trademarkPageContent').on('infinite', function (e) {
            //如果正在加载结束滚动事件
            if (loading)
                return;
            //正在加载
            loading = true;
            //模拟一秒加载过程
            setTimeout(function () {
                //加载结束
                loading = false;
                /**
                 * 每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                 */
                $$.getJSON(config.api.url + "/items", param, (data, status, xhr) => {
                    totalCount = xhr.getResponseHeader('x-pagination-total-count')
                    console.log(totalCount + '----' + param.page)
                    let perLoadData = {trademark: data}
                    let perLoadHtml = listTemplate(perLoadData);
                    $$("#trademarkUl").append(perLoadHtml);
                    //如果加载的总数据大于等于回调数据时，销毁滚动事件和清除preloader样式
                    if (param.page * perCount >= totalCount) {
                        app.detachInfiniteScroll($$('#trademarkPageContent'))
                        $$('#trademarkInfinitePreloader').remove()
                        return;
                    }
                    //下次滚动发送请求时，分页为下一页
                    param.page++
                })
            }, 1000)
        })
    }
}
/**
 * 去除字符串两端空格
 * @param str
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/, "")
}
/**
 * 清除所有遮罩层
 */
function removeAllEject() {
    $$('#trademarkTypeEject').removeClass('c-layer-show84')
    $$('#trademarkPriceRangeEject').removeClass('c-layer-show84')
    $$('#trademarkSortMethodEject').removeClass('c-layer-show84')
}
/**
 * 清除所有选中状态
 */
function removeAllChosen() {
    $$('#trademarkTypeFilter').removeClass('c-chosen')
    $$('#trademarkPriceRangeFilter').removeClass('c-chosen')
    $$('#trademarkSortMethodFilter').removeClass('c-chosen')
}
