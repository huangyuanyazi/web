/**
 * filter.js
 * 商标首页的筛选栏点击事件
 * @param layer 弹出层样式
 */
function handleFilter(layer) {
    // let filter_map = {
    //     '.c-trademarkType': {
    //         eject: ".c-trademarkType-eject",
    //     },
    //     '#trademarktype_filter': {
    //         eject: "#trademarktype_filter-eject",
    //     },
    //     '#trademarkpriceRange_filter': {
    //         eject: "#trademarkpriceRange_filter-eject",
    //     },
    //     '#trademarksortMethod_filter': {
    //         eject: "#trademarksortMethod_filter-eject",
    //     },
    // };
    /**
     * 筛选栏，弹出层，弹出层参数，一一对应的关系对象
     */
    let loadDataMap = {
        '#trademarkTypeFilter': {
            param: "trademarkType",
            ejectContent: "#trademarkTypeUl",
            eject: "#trademarkTypeEject",
            data:[
                {
                    "ejectTitle": "默认",
                    "filterId": "trademarkTypeDefault",
                    "id": 1,
                    "filterSelector": "#trademarkTypeFilter",
                    "filterData":"",
                    "filterShow":"商标类型"
                },
                {
                    "ejectTitle": "文字商标",
                    "filterId": "trademarkTypeCharacter",
                    "id": 2,
                    "filterSelector": "#trademarkTypeFilter",
                    "filterData":"0",
                    "filterShow":"文字商标"

                },
                {
                    "ejectTitle": "图形商标",
                    "filterId": "trademarkTypeImage",
                    "id": 3,
                    "filterSelector": "#trademarkTypeFilter",
                    "filterData":"1",
                    "filterShow":"图形商标"
                }
            ]
        },
        '#trademarkPriceRangeFilter': {
            param: "trademarkPriceRange",
            ejectContent: "#trademarkPriceRangeUl",
            eject: "#trademarkPriceRangeEject",
            data:[
                {
                    "ejectTitle": "默认",
                    "filterId": "trademarkPriceRangeDefault",
                    "id": 1,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"",
                    "filterShow":"价格范围"
                },
                {
                    "ejectTitle": "1000以下",
                    "filterId": "trademarkPriceRangeUnder1000",
                    "id": 2,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"<1000",
                    "filterShow":"1000以下"
                },
                {
                    "ejectTitle": "1000-2000",
                    "filterId": "trademarkPriceRange1000to2000",
                    "id": 3,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"[1000,2000]",
                    "filterShow":"1000-2000"
                },
                {
                    "ejectTitle": "2000-3000",
                    "filterId": "trademarkPriceRange2000To3000",
                    "id": 4,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"[2000,3000]",
                    "filterShow":"2000-3000"
                },
                {
                    "ejectTitle": "3000-5000",
                    "filterId": "trademarkPriceRange3000To5000",
                    "id": 5,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"[3000,5000]",
                    "filterShow":"3000-5000"
                },
                {
                    "ejectTitle": "5000-10000",
                    "filterId": "trademarkPriceRange5000To10000",
                    "id": 6,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"[5000,10000]",
                    "filterShow":"5000-10000"
                },
                {
                    "ejectTitle": "10000-50000",
                    "filterId": "trademarkPriceRange10000To50000",
                    "id": 7,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":"[10000,50000]",
                    "filterShow":"10000-50000"
                },
                {
                    "ejectTitle": "50000以上",
                    "filterId": "trademarkPriceRangeAbove50000",
                    "id": 8,
                    "filterSelector": "#trademarkPriceRangeFilter",
                    "filterData":">50000",
                    "filterShow":"50000以上"
                }
            ]
        },
        '#trademarkSortMethodFilter': {
            param: "trademarkSortMethod",
            ejectContent: "#trademarkSortMethodUl",
            eject: "#trademarkSortMethodEject",
            data:[
                {
                    "ejectTitle": "默认",
                    "filterId": "trademarkSortDefault",
                    "id": 1,
                    "filterSelector": "#trademarkSortMethodFilter",
                    "filterData":"",
                    "filterShow":"排序方式"
                },
                {
                    "ejectTitle": "发布时间",
                    "filterId": "trademarkSortReleaseTime",
                    "id": 2,
                    "filterSelector": "#trademarkSortMethodFilter",
                    "filterData":"+shelved_at",
                    "filterShow":"发布时间"
                },
                {
                    "ejectTitle": "人气",
                    "filterId": "trademarkSortPopularity",
                    "id": 3,
                    "filterSelector": "#trademarkSortMethodFilter",
                    "filterData":"+follow",
                    "filterShow":"人气"
                },
                {
                    "ejectTitle": "价格",
                    "filterId": "trademarkSortPrice",
                    "id": 4,
                    "filterSelector": "#trademarkSortMethodFilter",
                    "filterData":"+price",
                    "filterShow":"价格"
                }
            ]
        },
    }
    //编译模板
    let trademarkEjectTemplate = Template7.compile($$('#trademarkEjectTemplate').html());
    // let listEject_trademarkPagination = Template7.compile($$('#ejectSortTemplate').html());
    // $$.getJSON('http://localhost:9093/trademark_classify?_start=0&_end=22', (data, status, xhr) => {
    //     console.log(data)
    //     $$("#trademark_classify_ul_part1").html(listEject_trademarkPagination({eject_titles: data}));
    //
    // })
    // $$.getJSON('http://localhost:9093/trademark_classify?_start=22&_end=45', (data, status, xhr) => {
    //     console.log(data)
    //     $$("#trademark_classify_ul_part2").html(listEject_trademarkPagination({eject_titles: data}));
    //
    // })
    /**
     * 根据关系对象，获取各弹出层内容，并对各点击行为作出合理响应
     */
    for (let key in loadDataMap) {
            $$(loadDataMap[key].ejectContent).html(trademarkEjectTemplate({ejectTitles: loadDataMap[key].data}));
        $$(key).on('click', function (e) {
            if ($$(loadDataMap[key].eject).hasClass(layer)) {
                removeAllChosen()
                removeAllEject()
                console.log('隐藏选中弹出层')
            } else {
                removeAllChosen()
                removeAllEject()
                showEject(loadDataMap[key].eject)
                showChosen(key)
                console.log('显示选中弹出层')
            }
        })
    }
    /**
     * 移除所有筛选栏选中状态
     */
    function removeAllChosen() {
        // $$('.c-trademarkType').removeClass('c-chosen')
        $$('#trademarkTypeFilter').removeClass('c-chosen')
        $$('#trademarkPriceRangeFilter').removeClass('c-chosen')
        $$('#trademarkSortMethodFilter').removeClass('c-chosen')
    }

    /**
     * 为所选筛选栏添加选中样式
     * @param key 所选筛选栏
     */
    function showChosen(key) {

        $$(key).addClass('c-chosen')
    }

    /**
     * 移除所有弹出层
     */
    function removeAllEject() {
        // $$('.c-trademarkType-eject').removeClass(layer)
        $$('#trademarkTypeEject').removeClass(layer)
        $$('#trademarkPriceRangeEject').removeClass(layer)
        $$('#trademarkSortMethodEject').removeClass(layer)
    }

    /**
     * 根据所点筛选栏弹出相应弹出层
     * @param eject 弹出层样式
     */
    function showEject(eject) {

        $$(eject).addClass(layer)

    }
}
export default handleFilter
        
        
        
        
        
        
