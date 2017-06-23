/**
 * Created by Wangxy on 2017/5/9.
 */

/**
 * 总记录数
 * @type {number}
 * @private
 */
let _totalCount = 0

/**
 * 每页记录数
 * @type {number}
 * @private
 */
let _pageSize = 20

/**
 * 总页数
 * @type {number}
 * @private
 */
let _pageCount = 0

/**
 * 连续显示的页码数
 * @type {number}
 * @private
 */
let _pageSeries = 5

/**
 * 分页参数名称
 * @type {string}
 * @private
 */
let _queryName = '_page'

/**
 * 当前页数
 * @type {number}
 * @private
 */
let _currentPage = 1

/**
 * 分页构造函数
 * @param totalCount 总记录数，必选
 * @param currentPage 当前页数，可选，默认为1
 * @param pageSize 每页记录数，可选，默认为20
 * @constructor
 */
let Pagination = function (totalCount, currentPage, pageSize) {
    _totalCount = parseInt(totalCount)
    if(pageSize)
        _pageSize = pageSize
    _pageCount = 0 === _totalCount % _pageSize ? _totalCount / _pageSize : Math.ceil(_totalCount / _pageSize)
    if(currentPage) {
        _currentPage = parseInt(currentPage) > _pageCount ? _pageCount : parseInt(currentPage)
        if(_currentPage < 1)
            _currentPage = 1
    }
}

/**
 * 获取分页节点，每个节点采用数组存储，数组第一个元素为页码数字，第二个元素为页码显示内容
 * @returns {Array} 分页节点
 */
Pagination.prototype.getNodes = function () {
    let nodes = []
    nodes.push([_currentPage < 2 ? 1 : _currentPage - 1, '上一页'])
    if(_pageCount < _pageSeries + 5) {
        for (let i = 1; i <= _pageCount; i++) {
            nodes.push([i, i])
        }
    } else {
        let left = Math.floor((_pageSeries - 1) / 2)
        let right = _pageSeries - left - 1
        let jump = _pageSeries + 4
        for (let i = 1; i <= jump; i++) {
            if(i === 1) {
                nodes.push([1, 1])
            } else if (i === 2) {
                nodes.push(_currentPage < 4 + left ? [2, 2] : [_currentPage - _pageSeries, '...'])
            } else if (i === jump - 1) {
                nodes.push(_currentPage > _pageCount - 3 - right ? [_pageCount - 1, _pageCount - 1] : [_currentPage + _pageSeries, '...'])
            } else if (i === jump) {
                nodes.push([_pageCount, _pageCount])
            } else {
                if (_currentPage < 4 + left) {
                    nodes.push([i, i])
                } else if (_currentPage > _pageCount - 3 - right) {
                    nodes.push([_pageCount - jump + i, _pageCount - jump + i])
                } else {
                    nodes.push([i + _currentPage - left - 3, i + _currentPage - left - 3])
                }
            }
        }
    }
    nodes.push([_currentPage + 1 > _pageCount ? _pageCount : _currentPage + 1, '下一页'])
    return nodes
}

/**
 * 获取分页html
 * @param url
 * @param queryName
 * @returns {string}
 */
Pagination.prototype.getHtml = function (url, queryName) {
    if(queryName)
        _queryName = queryName
    let html = '<div class="c-pagination">'
    url += -1 === url.indexOf('?') ? '?' : '&'
    url +=  _queryName + '='
    let nodes = this.getNodes()
    let nodeCount = nodes.length
    for (let i = 0; i < nodes.length; i++) {
        if(nodes[i][0] === _currentPage) {
            html += '<span'
            if (i === 0) {
                html += ' class="previous"'
            } else if (i === nodeCount - 1) {
                html += ' class="next"'
            } else {
                html += ' class="current"'
            }
            html += '>' + nodes[i][1] + '</span>'
        } else {
            html += '<a href="' + url + nodes[i][0] + '"'
            if(i === 0) {
                html += ' class="previous"'
            } else if (i === nodeCount - 1) {
                html += ' class="next"'
            }
            html += '>' + nodes[i][1] + '</a>'
        }
    }
    html += '</div>'
    return html
}

/**
 * 获取页数
 * @returns {number}
 */
Pagination.prototype.getPageCount = function () {
    return _pageCount
}

/**
 * 获取limit，供sql语句使用
 * @returns {[*,*]}
 */
Pagination.prototype.getLimit = function () {
    return [(_currentPage - 1) * _pageSize, _pageSize]
}

module.exports = Pagination