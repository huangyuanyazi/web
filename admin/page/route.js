/**
 * Created by Wangxy on 2017/4/11.
 */
export default [
    { path: "/item/item-index", component: resolve => require(["./item/item-index.vue"], resolve), meta: { menu: 'item:index', crumbs: ["商品", "商品管理"] } },
    { path: "/item/item-create/:type?", component: resolve => require(["./item/item-create.vue"], resolve), meta: { crumbs: ["商品", "商品管理", "新增"] } },
    { path: "/item/item-edit/:id?", component: resolve => require(["./item/item-edit.vue"], resolve), meta: { crumbs: ["商品", "商品管理", "编辑"] } },
    { path: "/item/item-batch-edit", component: resolve => require(["./item/item-batch-edit.vue"], resolve), meta: { crumbs: ["商品", "商品管理", "批量编辑"] } },
    { path: "/item/category-index", component: resolve => require(["./item/category-index.vue"], resolve), meta: { crumbs: ["商品", "分类管理"] } },
    { path: "/item/category-edit/:id?", component: resolve => require(["./item/category-edit.vue"], resolve), meta: { crumbs: ["商品", "分类管理", "编辑"] } },
    /*
    { path: "/content/article-index", component: resolve => require(["./content/article-index.vue"], resolve), meta: { crumbs: ["内容", "文章管理", "列表"] } },
    { path: "/content/article-edit/:id?", component: resolve => require(["./content/article-edit.vue"], resolve), meta: { crumbs: ["内容", "文章管理", "编辑"] } },
    { path: "/content/article-category-index", component: resolve => require(["./content/article-category-index.vue"], resolve), meta: { crumbs: ["内容", "文章分类管理"] } },
    { path: "/content/article-category-edit/:id?", component: resolve => require(["./content/article-category-edit.vue"], resolve), meta: { crumbs: ["内容", "文章分类管理", "编辑"] } },
    { path: "/content/adv-index", component: resolve => require(["./content/adv-index.vue"], resolve), meta: { crumbs: ["内容", "广告管理"] } },
    { path: "/content/adv-edit/:id?", component: resolve => require(["./content/adv-edit.vue"], resolve), meta: { crumbs: ["内容", "广告管理", "编辑"] } },
    { path: "/content/adv-position-index", component: resolve => require(["./content/adv-position-index.vue"], resolve), meta: { crumbs: ["内容", "广告位置管理"] } },
    { path: "/content/adv-position-edit/:id?", component: resolve => require(["./content/adv-position-edit.vue"], resolve), meta: { crumbs: ["内容", "广告位置管理", "编辑"] } },
     */
    { path: '/content', component: resolve => require(["./content/index.vue"], resolve),
        children: [
            { path: "article", component: resolve => require(["./content/article-index.vue"], resolve),
                children: [

                ]
            }
        ]
    },

    { path: "/patent/patent-index", component: resolve => require(["./patent/patent-index.vue"], resolve), meta: { crumbs: ["专利", "专利管理"] } },
    { path: "/patent/patent-detail/:id", component: resolve => require(["./patent/patent-detail.vue"], resolve), meta: { crumbs: ["专利", "专利管理", "详情"] } },
    { path: "/patent/patent-edit/:id?", component: resolve => require(["./patent/patent-edit.vue"], resolve), meta: { crumbs: ["专利", "专利管理", "编辑"] } },
    { path: "/patent/patent-status-batch-modify", component: resolve => require(["./patent/patent-status-batch-edit.vue"], resolve), meta: { crumbs: ["专利", "专利管理", "批量更新专利状态"] } },
    { path: "/user/user-index", component: resolve => require(["./user/user-index.vue"], resolve), meta: { crumbs: ["用户", "用户管理"] } },
    { path: "/user/user-edit/:id?", component: resolve => require(["./user/user-edit.vue"], resolve), meta: { crumbs: ["用户", "用户管理", "编辑"] } },
    { path: "/user/user-auth-edit/:user_id", component: resolve => require(["./user/user-auth-edit.vue"], resolve), meta: { crumbs: ["用户", "用户管理", "分配权限"] } },
    { path: "/user/role-index", component: resolve => require(["./user/role-index.vue"], resolve), meta: { crumbs: ["用户", "角色管理"] } },
    { path: "/user/role-edit/:id?", component: resolve => require(["./user/role-edit.vue"], resolve), meta: { crumbs: ["用户", "角色管理", "编辑"] } },
    { path: "/system/setting-index", component: resolve => require(["./system/setting-index.vue"], resolve), meta: { crumbs: ["系统", "网站设置"] } },
    { path: "/system/setting-edit/:id?", component: resolve => require(["./system/setting-edit.vue"], resolve), meta: { crumbs: ["系统", "网站设置", "编辑"] } },
    { path: "/system/resource-index", component: resolve => require(["./system/resource-index.vue"], resolve), meta: { crumbs: ["系统", "资源管理"] } },
    { path: "/system/resource-edit/:id?", component: resolve => require(["./system/resource-edit.vue"], resolve), meta: { crumbs: ["系统", "资源管理", "编辑"] } },
    { path: "/system/menu-index", component: resolve => require(["./system/menu-index.vue"], resolve), meta: { crumbs: ["系统", "界面管理"] } },
    { path: "/system/menu-edit/:id?", component: resolve => require(["./system/menu-edit.vue"], resolve), meta: { crumbs: ["系统", "界面管理", "编辑"] } }
    //{ path: "/error", component: resolve => require(["./error.vue"], resolve), meta: { crumbs: ["系统错误"] } }
]