/**
 * Created by john on 2017/4/19.
 */
export default {
    pageInit (app, page) {
        let companyJ = page.query.company
        console.log(companyJ)
        //-------------------详情页标题----------------------
        $$('#seller_company').text(companyJ)
        //---------------------patent ----------------------
        let sellerPatentTemplate = Template7.compile($$("#seller_patent_template").html())
        $$.getJSON("http://localhost:9093/patent?company=" + companyJ, (data, status, xhr) => {
            console.log("----专利---")
            console.log(data)
            if (data.length > 5) {
                $$("#seller_patent_ul").html(sellerPatentTemplate({patents: data.slice(0, 5)}))
                //-----------------------------------无限滚动---------------------------------
                infiniteScrollP(data, sellerPatentTemplate, app)

            } else {
                $$("#seller_patent_ul").html(sellerPatentTemplate({patents: data}))
            }


        })

        let listTemplateT = Template7.compile($$("#trademark_template").html())
        $$.getJSON('http://localhost:9093/trademark?company=' + companyJ, (data, status, xhr) => {
            console.log("----商标---")
            console.log(data)
            if (data.length > 10) {
                $$("#trademark_ul").html(listTemplateT({trademark: data.slice(0, 10)}));
                infinitScrollT(data, listTemplateT, app)
            } else {
                $$("#trademark_ul").html(listTemplateT({trademark: data}));
            }


        })

//----------------patent and trademark  filter---------------------------------
        filterAndEjectP()
        filterAndEjectT()

//--------------------------分享actionsheet----------------------
        $$(document).on('click', '#seller_patent_share', function () {
            var buttons = [
                {
                    text: '微信',
                    bold: true, color: "orange"
                },
                {
                    text: '新浪',
                    bold: true, color: "green"
                },
                {
                    text: 'QQ',
                    bold: true, color: "purple"
                },
                {
                    text: '取消',
                    bold: true, color: "red"
                },
            ];
            app.actions(buttons);
        })
    }
}

//----------------------------------patent filter-------------------------------
function filterAndEjectP() {

    var filter_map = {
        '.c-patentType': {
            param: "patentType",
            eject: ".c-patentType-eject",
            eject_content: "#patentType_ul"
        },
        '.c-patentStatus': {
            param: "patentStatus",
            eject: ".c-patentStatus-eject",
            eject_content: "#patentStatus_ul"
        },
        '.c-priceRange': {
            param: "priceRange",
            eject: ".c-priceRange-eject",
            eject_content: "#priceRange_ul"
        },
        '.c-sortMethod': {
            param: "sortMethod",
            eject: ".c-sortMethod-eject",
            eject_content: "#sortMethod_ul"
        },
    };
    let listEject_patent = Template7.compile($$('#ejectTemplate').html());
    for (let key in filter_map) {
        $$.getJSON('http://localhost:9093/' + filter_map[key].param, (data, status, xhr) => {
            $$(filter_map[key].eject_content).html(listEject_patent({eject_titles: data}));
        })
    }

}
//-----------------------------------trademark filter-------------------------------
function filterAndEjectT() {
    let filter_map = {
        '.c-patentType': {
            eject: ".c-patentType-eject",
        },
        '.c-patentStatus': {
            eject: ".c-patentStatus-eject",
        },
        '.c-priceRange': {
            eject: ".c-priceRange-eject",
        },
        '.c-sortMethod': {
            eject: ".c-sortMethod-eject",
        },
    };
    let loadData_map = {
        '.c-patentStatus': {
            param: "trademark_type",
            eject_content: "#trademark_type_ul"
        },
        '.c-priceRange': {
            param: "trademark_priceRange",
            eject_content: "#trademark_priceRange_ul"
        },
        '.c-sortMethod': {
            param: "trademark_sortMethod",
            eject_content: "#trademark_sortMethod_ul"
        },
    }
    let listEject_trademarkUl = Template7.compile($$('#ejectTemplate').html());
    let listEject_trademarkPagination = Template7.compile($$('#ejectSortTemplate').html());
    $$.getJSON('http://localhost:9093/trademark_classify?_start=0&_end=22', (data, status, xhr) => {
        console.log(data)
        $$("#trademark_classify_ul_part1").html(listEject_trademarkPagination({eject_titles: data}));

    })
    $$.getJSON('http://localhost:9093/trademark_classify?_start=22&_end=45', (data, status, xhr) => {
        console.log(data)
        $$("#trademark_classify_ul_part2").html(listEject_trademarkPagination({eject_titles: data}));

    })
    for (let key in loadData_map) {
        $$.getJSON('http://localhost:9093/' + loadData_map[key].param, (data, status, xhr) => {
            $$(loadData_map[key].eject_content).html(listEject_trademarkUl({eject_titles: data}));

        })
    }
    for (let key in filter_map) {
        $$(key).on('click', function (e) {
            if ($$(filter_map[key].eject).hasClass('c-layer-show124')) {
                removeAllChosen()
                removeAllEject()
                console.log('隐藏选中弹出层')
            } else {
                removeAllChosen()
                removeAllEject()
                showEject(filter_map[key].eject)
                showChosen(key)
                console.log('显示选中弹出层')
            }
        })

    }

}


function removeAllChosen() {
    $$('.c-patentType').removeClass('chosen')
    $$('.c-patentStatus').removeClass('chosen')
    $$('.c-priceRange').removeClass('chosen')
    $$('.c-sortMethod').removeClass('chosen')
}

function showChosen(key) {

    $$(key).addClass('chosen')
}

function removeAllEject() {
    $$('.c-patentType-eject').removeClass('c-layer-show124')
    $$('.c-patentStatus-eject').removeClass('c-layer-show124')
    $$('.c-priceRange-eject').removeClass('c-layer-show124')
    $$('.c-sortMethod-eject').removeClass('c-layer-show124')
}

function showEject(eject) {

    $$(eject).addClass('c-layer-show124')

}

function infiniteScrollP(data, sellerPatentTemplate, app) {
    let loading = false;
    let lastIndex = 5;
    let maxItems = data.length;
    let itemsPerload = 10;
    $$('.infinite-scroll').on('infinite', function (e) {

        console.log(data)
        if (loading)
            return;
        loading = true;
        setTimeout(function () {
            loading = false;
            if (lastIndex >= maxItems) {
                app.detachInfiniteScroll($$('.inifinite-scroll'))
                $$('.infinite-scroll-preloader').remove()
                return;
            }
            let obj_patent = {patents: data.slice(lastIndex, lastIndex + itemsPerload)}
            let html_pre_index = sellerPatentTemplate(obj_patent);

            $$("#seller_patent_ul").append(html_pre_index);
            lastIndex = $$("#seller_patent_ul li").length;
        }, 1000)
    })
}
function infinitScrollT(data, listTemplateT, app) {
    let loadingT = false;
    let lastIndexT = 10;
    let maxItemsT = data.length - 5;
    let itemsPerloadT = 10;
    $$('.infinite-scroll').on('infinite', function (e) {

        console.log(data)
        if (loadingT)
            return;
        loadingT = true;
        setTimeout(function () {
            loadingT = false;
            if (lastIndexT >= maxItemsT) {
                app.detachInfiniteScroll($$('.inifinite-scroll'))
                $$('.infinite-scroll-preloader').remove()
                return;
            }
            let obj_patentT = {trademark: data.slice(lastIndexT, lastIndexT + itemsPerloadT)}
            let html_pre_indexT = listTemplateT(obj_patentT);

            $$("#trademark_ul").append(html_pre_indexT);
            lastIndexT = $$("#trademark_ul li").length;
        }, 1000)
    })
}

