/**
 * Created by Wangxy on 2017/6/13.
 */
export default [
    { path: "/patent-index", component: resolve => require(["./patent-index.vue"], resolve), meta: { crumbs: ["专利", "专利管理"] } },
    { path: "/patent-detail/:id", component: resolve => require(["./patent-detail.vue"], resolve), meta: { crumbs: ["专利", "专利管理", "详情"] } }
]