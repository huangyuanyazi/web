/**
 * Created by john on 2017/4/18.
 */
export default {
    "page/patent/index.html": resolve => require(["./patent/index.js"], resolve),
    "page/patent/detail.html": resolve => require(["./patent/detail.js"], resolve),
    "page/patent/search.html": resolve => require(["./patent/search.js"], resolve),
    "page/patent/seller_patent.html": resolve => require(["./patent/seller_patent.js"], resolve),
    "page/trademark/index.html": resolve => require(["./trademark/index.js"], resolve),
    "page/trademark/detail.html": resolve => require(["./trademark/detail.js"], resolve),
    "page/trademark/search.html": resolve => require(["./trademark/search.js"], resolve),
}