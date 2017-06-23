/**
 * search.js
 * 专利搜索页的相关代码
 */
export default {
    pageInit (app, page) {
        /**
         * 自动填充
         */
        let patentAutocompleteDropdownAjax = app.autocomplete({
            input: '#patentAutocompleteInput',
            openIn: 'dropdown',
            //允许加载样式
            preloader: true,
            //对象value的属性名
            valueProperty: 'id',
            //对象text的属性名
            textProperty: 'searchContent',
            //限制二十个自动填充结果
            limit: 20,
            //搜索框获得焦点后的默认下拉框
            dropdownPlaceholderText: '试试搜索 "油烟机的发明"',
            //下拉列表为全屏范围
            expandInput: true,
            source: function (autocomplete, query, render) {
                var results = [];
                if (query.length === 0) {
                    render(results);
                    return;
                }
                // 显示加载样式
                autocomplete.showPreloader();
                /**
                 * 发送异步请求获取数据
                 */
                $$.ajax({
                    url: config.mock.url+'/autocompleteSearch',
                    method: 'GET',
                    dataType: 'json',
                    //发送查询参数到服务器

                    data: {
                        query: query
                    },
                    success: function (data) {
                        /**
                         * 找到匹配项
                         */
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].searchContent.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                        }
                        //隐藏加载样式
                        autocomplete.hidePreloader();
                        //渲染查询结果到显示列表
                        render(results);
                    }
                });
            }
        });
        //编译模板
        var hotSearchTemplate = Template7.compile($$("#hotSearchTemplate").html())
        /**
         * 热门搜索模板填充
         */
        $$.getJSON(config.mock.url+"/hotSearch", (data, status, xhr) => {
            $$("#hotSearch .card-content-inner").html(hotSearchTemplate({hotSearchList: data}))
        });
        //编译模板
        var historySearchTemplate = Template7.compile($$("#historySearchTemplate").html())
        /**
         * 如果localStorage中有数据，取出并渲染模板
         */
        if (window.localStorage.historySearchData) {
            let data = getObjFromLocalStorage('historySearchData')
            $$("#historySearch ul").html(historySearchTemplate({historySearchList: data}))
        }
        /**
         * 按键事件
         */
        $$('#patentSearch').on('keypress', '#patentAutocompleteInput', function (event) {
            // alert(event.keyCode)
            /**
             * 判断localstorage中是否有键值，如有取出并追加，若无，新建空数组
             */
            if (window.localStorage.historySearchData) {
                var historySearchData = JSON.parse(window.localStorage.getItem('historySearchData'))
            } else {
                var historySearchData = []
            }
            /**
             * 浏览器中的enter键/手机中的搜索键触发搜索事件,
             * 存储搜索过的内容
             * 将输入框中的内容作为查询参数传入到index页面
             */
            if (event.keyCode == 13) {
                if ($$('#patentAutocompleteInput').val().length > 0) {
                    console.log('向历史记录存储数据')
                    let historyItem = $$('#patentAutocompleteInput').val()
                    historySearchData.push(JSON.stringify({historyItem: historyItem}))
                    window.localStorage.historySearchData = JSON.stringify(historySearchData);
                    let data = getObjFromLocalStorage('historySearchData')
                    $$("#historySearch ul").html(historySearchTemplate({historySearchList: data}))
                    page.view.loadPage('page/patent/index.html?search='+historyItem);
                    document.activeElement.blur()
                }
            }
        })
        /**
         * 清除历史记录
         * 清除存储的搜索数据
         * 清除dom
         */
        $$('#patentSearch').on('click', '#historyCleaner', function () {
            window.localStorage.removeItem('historySearchData')
            // historySearchData=[]
            $$("#historySearch ul").html('')
        })
    }
}
/**
 * 获取localStorage上存储的字符串，转变字符串为数组对象，再将数组中的字符串遍历为对象
 * @param key localStorage中的键名
 */
function getObjFromLocalStorage(key) {
    let history = window.localStorage.getItem(key)
    let historyOb = JSON.parse(history)
    for (let i = 0; i < historyOb.length; i++) {
        historyOb[i] = JSON.parse(historyOb[i]);
    }
    return historyOb;
}

