/**
 * Created by john on 2017/4/11.
 */
export default [
    {path: "/item", component: resolve => require(["./item/index.vue"], resolve)},
    {path: "/item/edit", component: resolve => require(["./item/edit.vue"], resolve)},
    {path: "/trade/sale-order", component: resolve => require(["./trade/sale-order-index.vue"], resolve)}
]