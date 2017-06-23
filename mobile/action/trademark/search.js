/**
 * search.js
 * 商标搜索页中的相关代码
 */
import trademarkClassify from './trademarkClassify'
export default {
    pageInit (app, page) {
        /**
         * 自动填充
         */
        let trademarkAutocompleteDropdownAjax = app.autocomplete({
            input: '#trademarkAutocompleteInput',
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
        let trademarkClassifyTemplate = Template7.compile($$('#ejectSortTemplate').html());
        /**
         * 商标分类列表数据的获取与渲染
         */
            $$("#trademarkClassify").html(trademarkClassifyTemplate({ejectTitles: trademarkClassify}));
        /**
         *按键事件
         * 将输入框中的内容作为查询参数传入到index页面
         */
        $$('#trademarkSearch').on('keypress', '#trademarkAutocompleteInput', function () {
            if (event.keyCode == 13) {
                page.view.loadPage('page/trademark/index.html?search=' + $$('#trademarkAutocompleteInput').val())
                document.activeElement.blur()
            }
        })
    }
}