/**
 * filter.js
 * 专利首页筛选栏的点击方法
 * @param layer 弹出层样式
 */
function handleFilter(layer) {
    /**
     * 筛选栏，弹出层，弹出层参数，一一对应的关系对象
     */
    var filterMap = {
        '#patentTypeFilter': {
            param: "patentType",
            eject: "#patentTypeEject",
            ejectContent: "#patentTypeUl",
            data: [
                {
                    "ejectTitle": "默认",
                    "filterId": "patentTypeDefault",
                    "id": 1,
                    "filterSelector": "#patentTypeFilter",
                    "filterData": "",
                    "filterShow": "专利类型"
                },
                {
                    "ejectTitle": "发明",
                    "filterId": "patentTypeInvent",
                    "id": 2,
                    "filterSelector": "#patentTypeFilter",
                    "filterData": "0",
                    "filterShow": "发明"

                },
                {
                    "ejectTitle": "实用新型",
                    "filterId": "patentTypeUtilityModel",
                    "id": 3,
                    "filterSelector": "#patentTypeFilter",
                    "filterData": "1",
                    "filterShow": "实用新型"
                },
                {
                    "ejectTitle": "外观设计",
                    "filterId": "patentTypeDesign",
                    "id": 4,
                    "filterSelector": "#patentTypeFilter",
                    "filterData": "2",
                    "filterShow": "外观设计"
                }
            ]
        },
        '#patentStatusFilter': {
            param: "patentStatus",
            eject: "#patentStatusEject",
            ejectContent: "#patentStatusUl",
            data: [
                {
                    "ejectTitle": "默认",
                    "filterId": "patentStatusDefault",
                    "id": 1,
                    "filterSelector": "#patentStatusFilter",
                    "filterData": "",
                    "filterShow": "专利状态"
                },
                {
                    "ejectTitle": "授权未缴费",
                    "filterId": "patentStatusAuthorizeNotPay",
                    "id": 2,
                    "filterSelector": "#patentStatusFilter",
                    "filterData": "0",
                    "filterShow": "授权未缴费"
                },
                {
                    "ejectTitle": "已下证",
                    "filterId": "patentStatusIssued",
                    "id": 3,
                    "filterSelector": "#patentStatusFilter",
                    "filterData": "1",
                    "filterShow": "已下证"
                }
            ]
        },
        '#patentPriceRangeFilter': {
            param: "priceRange",
            eject: "#patentPriceRangeEject",
            ejectContent: "#priceRangeUl",
            data: [
                {
                    "ejectTitle": "默认",
                    "filterId": "patentPriceRangeDefault",
                    "id": 1,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "",
                    "filterShow": "价格范围"
                },
                {
                    "ejectTitle": "1000以下",
                    "filterId": "patentPriceRangeUnder1000",
                    "id": 2,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "<1000",
                    "filterShow": "1000以下"
                },
                {
                    "ejectTitle": "1000-2000",
                    "filterId": "patentPriceRange1000to2000",
                    "id": 3,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "[1000,2000]",
                    "filterShow": "1000-2000"
                },
                {
                    "ejectTitle": "2000-3000",
                    "filterId": "patentPriceRange2000To3000",
                    "id": 4,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "[2000,3000]",
                    "filterShow": "2000-3000"
                },
                {
                    "ejectTitle": "3000-5000",
                    "filterId": "patentPriceRange3000To5000",
                    "id": 5,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "[3000,5000]",
                    "filterShow": "3000-5000"
                },
                {
                    "ejectTitle": "5000-10000",
                    "filterId": "patentPriceRange5000To10000",
                    "id": 6,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "[5000,10000]",
                    "filterShow": "5000-10000"
                },
                {
                    "ejectTitle": "10000-50000",
                    "filterId": "patentPriceRange10000To50000",
                    "id": 7,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": "[10000,50000]",
                    "filterShow": "10000-50000"
                },
                {
                    "ejectTitle": "50000以上",
                    "filterId": "patentPriceRangeAbove50000",
                    "id": 8,
                    "filterSelector": "#patentPriceRangeFilter",
                    "filterData": ">50000",
                    "filterShow": "50000以上"
                }
            ]
        },
        '#patentSortMethodFilter': {
            param: "sortMethod",
            eject: "#patentSortMethodEject",
            ejectContent: "#sortMethodUl",
            data: [
                {
                    "ejectTitle": "默认",
                    "filterId": "patentSortDefault",
                    "id": 1,
                    "filterSelector": "#patentSortMethodFilter",
                    "filterData": "",
                    "filterShow": "排列顺序"
                },
                {
                    "ejectTitle": "发布时间",
                    "filterId": "patentSortReleaseTime",
                    "id": 2,
                    "filterSelector": "#patentSortMethodFilter",
                    "filterData": "+shelved_at",
                    "filterShow": "发布时间"
                },
                {
                    "ejectTitle": "人气",
                    "filterId": "patentSortPopularity",
                    "id": 3,
                    "filterSelector": "#patentSortMethodFilter",
                    "filterData": "+follow",
                    "filterShow": "人气"
                },
                {
                    "ejectTitle": "价格",
                    "filterId": "patentSortPrice",
                    "id": 4,
                    "filterSelector": "#patentSortMethodFilter",
                    "filterData": "+price",
                    "filterShow": "价格"
                }
            ]
        },
    };
    //编译模板
    let patentListEject = Template7.compile($$('#patentEjectTemplate').html());
    /**
     * 根据关系对象，获取各弹出层内容，并对各点击行为作出合理响应
     */
    for (let key in filterMap) {
        // $$.getJSON(config.mock.url + '/' + filterMap[key].param, (data, status, xhr) => {
        $$(filterMap[key].ejectContent).html(patentListEject({ejectTitles: filterMap[key].data}));
        $$(key).on('click', function (e) {
            if ($$(filterMap[key].eject).hasClass(layer)) {
                removeAllChosen()
                removeAllEject()
                console.log('隐藏选中弹出层')
            } else {
                removeAllChosen()
                removeAllEject()
                showEject(filterMap[key].eject)
                showChosen(key)
                console.log('显示选中弹出层')

            }
        })
        // })
    }
    /**
     * 移除所有筛选栏选中状态
     */
    function removeAllChosen() {
        $$('#patentTypeFilter').removeClass('c-chosen')
        $$('#patentStatusFilter').removeClass('c-chosen')
        $$('#patentPriceRangeFilter').removeClass('c-chosen')
        $$('#patentSortMethodFilter').removeClass('c-chosen')
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
        $$('#patentTypeEject').removeClass(layer)
        $$('#patentStatusEject').removeClass(layer)
        $$('#patentPriceRangeEject').removeClass(layer)
        $$('#patentSortMethodEject').removeClass(layer)
    }

    /**
     * 根据所点筛选层弹出相应弹出层
     * @param eject 弹出层样式
     */
    function showEject(eject) {

        $$(eject).addClass(layer)

    }
}
export default handleFilter