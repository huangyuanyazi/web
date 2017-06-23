/**
 * index.js
 * 专利首页的相关js代码
 */
//导入filter.js的方法
import handleFilter from './filter.js'
Template7.registerHelper('json', function (condition, options) {
    let value = JSON.parse(condition)
    let key = options.hash.key
    switch (key) {
        case'type':
            switch (value[options.hash.key]) {
                case 0:
                    return "发明"
                    break;
                case 1:
                    return "实用新型"
                    break;
                case 2:
                    return "外观设计"
                    break;
                default:
                    break;

            }
            break;
        case 'status':
            switch (value[options.hash.key]) {
                case 0:
                    return "授权未缴费"
                    break;
                case 1:
                    return "已下证"
                    break;
                default:
                    break
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
export default {
    pageInit (app, page) {
        //模板编译
        let listTemplate = Template7.compile($$("#patentTemplate").html())
        //请求参数
        let param = {"per-page":10, "page": 1,"item_class_id_1":1}
        let query = page.query;

        /**
         * 处理专利搜索页热门搜索栏传来的参数
         */
        if (query.hasOwnProperty('hotSearch')) {
            let hotSearchParam = query.hotSearch;
            console.log('专利--热门搜索查询参数--' + hotSearchParam)
            switch (true) {
                case hotSearchParam == "patentTypeInvent" || hotSearchParam == "patentTypeUtilityModel" || hotSearchParam == "patentTypeDesign":
                    param.patentTypeFilter = hotSearchParam
                    break
                //-------------------------------------------
                case hotSearchParam == "patentStatusAuthorizeNotPay" || hotSearchParam == "patentStatusIssued":
                    param.patentStatusFilter = hotSearchParam
                    break;
                //--------------------------------------------
                case hotSearchParam == "patentPriceRangeUnder1000" || hotSearchParam == "patentPriceRange1000To2000" || hotSearchParam == "patentPriceRange2000To3000" || hotSearchParam == "patentPriceRange3000To5000" || hotSearchParam == "patentPriceRange5000To10000" || hotSearchParam == "patentPriceRange10000To50000" || hotSearchParam == "patentPriceRangeAbove50000":
                    param.patentPriceFilter = hotSearchParam
                    break;
                default:
                    break;
            }
        }
        /**
         * 处理专利搜索页搜索框传来的参数
         */
        if (query.hasOwnProperty('search')) {
            let search = query.search;
            console.log('专利--search input查询参数--' + search)
        }
        /**
         * 处理专利搜索页历史搜索栏传来的参数
         */
        if (query.hasOwnProperty('historySearch')) {
            let historySearchItem = query.historySearch;
            console.log('专利--历史搜索查询参数--' + historySearchItem)

        }

        /**
         * 初始化数据
         */

        $$.getJSON(config.api.url + '/items', param, (data, status, xhr) => {
            console.log('11111111',data)
            $$("#patentUl").html(listTemplate({patents: data}))
        })
        //筛选栏事件
        handleFilter('c-layer-show84')
        //排序各项的点击次数，根据奇偶来判断是升序还是降序
        let patentPriceRangeClickCount = 0;
        let patentHotClickCount = 0;
        let patentReleaseTimeClickCount = 0;
        //注意不能用document作为代理否则重复绑定，
        $$('#patentPage').on('click', '.c-patentEjectItem', patentEjectItemClickEvent)
        /**
         * 弹出层各项点击事件
         * @param e
         */
        function patentEjectItemClickEvent(e) {
            // let clickedItem = this.childNodes[1].innerText;
            console.log('click-----------')
            //弹出层各项文字
            // let clickedItem =this.querySelector('.item-title').innerText
            //清除字符串首尾空格
            // clickedItem = trim(clickedItem)
            //移除遮罩层和选中状态
            removeAllEject()
            removeAllChosen()
            //取出选中项的data-id数据
            let dataID = this.dataset.filterId
            let filterData = this.dataset.filterData
            //取出选中项的data-filter数据
            let filterSelector = this.dataset.filterSelector
            let filterShow = this.dataset.filterShow
            console.log(filterSelector)
            //筛选栏根据所选条件重新赋值
            console.log($$("#patentPriceRangeFilter"))
            // $$(filterSelector).find('span').text(clickedItem)
            filterSelector = filterSelector.replace('#','')
            document.getElementById(filterSelector).querySelector('span').innerText =filterShow


            /**
             * 根据筛选条件向请求参数param中放入数据
             */
            switch (true) {
                case dataID == "patentTypeInvent" || dataID == "patentTypeUtilityModel" || dataID == "patentTypeDesign":
                    param["attributes->type"] = filterData
                    break
                case dataID == "patentStatusAuthorizeNotPay" || dataID == "patentStatusIssued":
                    param["attributes->status"] = filterData
                    break;
                case dataID == "patentPriceRangeUnder1000" || dataID == "patentPriceRange1000to2000" || dataID == "patentPriceRange2000To3000" || dataID == "patentPriceRange3000To5000" || dataID == "patentPriceRange5000To10000" || dataID == "patentPriceRange10000To50000" || dataID == "patentPriceRangeAbove50000":
                    param["price"] = filterData
                    break;
                case dataID == "patentSortReleaseTime"||dataID == "patentSortPopularity"||dataID == "patentSortPrice" :
                    //
                    // $$('.c-sortMethod span').text(clickedItem);
                    // patentPriceRangeClickCount++
                    // console.log(patentPriceRangeClickCount)
                    // param._sort = "patentReleaseTime"
                    // if (patentPriceRangeClickCount % 2 == 0) {
                    //     param._order = "DESC";
                    // } else {
                    //     param._order = "ASC";
                    // }
                    param["sort"]=filterData
                    break;
                case dataID == "patentTypeDefault":
                    delete param["attributes->type"]
                    break;
                case dataID == "patentStatusDefault":
                    delete param["attributes->status"]
                    break;
                case dataID == "patentPriceRangeDefault":
                    delete param["price"]
                    break;
                case dataID == "patentSortDefault":
                    delete param["sort"]
                    break
            }
            //重置初始页码
            param.page = 1;
            //滚动条置顶
            $$('#patentPageContent').scrollTop(0)
            /**
             * 根据所选条件向服务器请求数据
             */
            $$.getJSON(config.api.url + '/items',
                param,
                (data, status, xhr) => {
                    $$("#patentUl").html(listTemplate({patents: data}))
                    console.log(data)
                    //初始页面后重置滚动事件的初始页码
                    param.page = 2
                    //总数据条数
                    let totalCount = xhr.getResponseHeader('X-Pagination-Total-Count');
                    /**
                     * 根据数据条数判断是否需要添加修改preloader样式
                     */
                    if (totalCount == 0) {
                        console.log('data=0')
                        app.detachInfiniteScroll($$('#patentPageContent'))
                        if ($$('#patentPageContent').find('#patentInfinitePreloader').length == 0) {
                            $$('#patentPageContent').append('<div class="infinite-scroll-preloader" id="patentInfinitePreloader">对不起,没有您想要的内容</div>')
                            console.log('数据--0', 'preloader--0', '添加preloader')
                        } else {
                            $$('#patentInfinitePreloader').html('对不起没有您想要的内容')
                            console.log('数据--0', 'preloader--1', '修改preloader')
                        }
                    } else if (totalCount > 0 && totalCount <= 5) {
                        app.detachInfiniteScroll($$('#patentPageContent'))
                        console.log('0<data<=5')
                        if ($$('#patentPageContent').find('#patentInfinitePreloader').length !== 0) {
                            $$('#patentInfinitePreloader').remove()
                            console.log('0<data<=5', '移除preloader')
                        }
                    } else {
                        //开启滚动事件
                        app.attachInfiniteScroll($$('#patentPageContent'))
                        console.log('data>5')
                        if ($$('#patentPageContent').find('#patentInfinitePreloader').length == 0) {
                            $$('#patentPageContent').append('<div class="infinite-scroll-preloader" id="patentInfinitePreloader"><div class="preloader"></div></div>')
                            console.log('data>5', 'preloader--0', '添加preloader')
                        } else {
                            $$('#patentInfinitePreloader').html('<div class="preloader"></div>')
                        }
                    }
                })
        }

        //当前页数
        param.page = 2;
        //每页记录数
        let perCount = 10
        //总记录数
        let totalCount = 0
        //加载开关
        let loading = false
        /**
         * 无限滚动事件
         */
        $$('#patentPageContent').on('infinite', function (e) {
            //加载开关
            if (loading)
                return;
            loading = true;
            console.log('滚动param--------------------')
            //模拟一秒加载过程
            setTimeout(function () {
                loading = false
                //每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                $$.getJSON(config.api.url + "/items", param,
                    (data, status, xhr) => {
                        //数据总数
                        totalCount = xhr.getResponseHeader("X-Pagination-Total-Count");
                        console.log(totalCount + "---" + param.page)
                        let perPatentData = {patents: data};
                        let perLoadHtml = listTemplate(perPatentData)
                        $$("#patentUl").append(perLoadHtml)
                        //销毁滚动事件
                        if (param.page * perCount >= totalCount) {
                            app.detachInfiniteScroll($$('#patentPageContent'))
                            $$('#patentInfinitePreloader').remove()
                            return
                        }
                        //下次滚动发送请求时，分页为下一页
                        param.page++
                    })
            }, 1000)
        })
    }
}
/**
 * 去除字符串两端空格方法
 * @param str
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 清除所有遮罩层
 */
function removeAllEject() {
    $$('#patentTypeEject').removeClass('c-layer-show84')
    $$('#patentStatusEject').removeClass('c-layer-show84')
    $$('#patentPriceRangeEject').removeClass('c-layer-show84')
    $$('#patentSortMethodEject').removeClass('c-layer-show84')
}
/**
 * 清除所有选中状态
 */
function removeAllChosen() {
    $$('#patentTypeFilter').removeClass('c-chosen')
    $$('#patentStatusFilter').removeClass('c-chosen')
    $$('#patentPriceRangeFilter').removeClass('c-chosen')
    $$('#patentSortMethodFilter').removeClass('c-chosen')
}

function conversionWords() {
    let attributesDomPseudoArray = document.getElementsByClassName('c-attributes')
    for (let i = 0; i < attributesDomPseudoArray.length; i++) {
        if (attributesDomPseudoArray[i].innerText) {
            let attributes = attributesDomPseudoArray[i].innerText
            let attributesString = "专利类型："
            attributes = JSON.parse(attributes)
            switch (attributes.type) {
                case 0:
                    attributesString += "发明"
                    break;
                case 1:
                    attributesString += "实用新型"
                    break;
                case 2:
                    attributesString += "外观设计"
                    break;
            }
            attributesString += `专利号：${attributes.number}`
            switch (attributes.status) {
                case 0:
                    attributesString += '专利状态：授权未缴费'
                    break;
                case 1:
                    attributesString += '专利状态：已下证'
                    break;
            }
            attributesString += `缴费截止日期：${attributes.deadline}`
            attributesDomPseudoArray[i].innerText = attributesString
        }

    }
    let domArray = document.getElementsByClassName('c-keywords')
    for (let i = 0; i < domArray.length; i++) {
        let oldText = domArray[i].innerText
        //  console.log(oldText,'oldText')
        if (oldText) {
            oldText = JSON.parse(oldText).join()
            domArray[i].innerText = oldText
        }
    }
}
