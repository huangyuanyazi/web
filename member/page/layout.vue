<template>
    <div class="c-user">
        <div class="c-top">
            <div class="c-logo"><a href="/" target="_blank"><img :src="require('asset/image/logo-small.png')"></a></div>
            <div class="c-crumb">
                <el-breadcrumb>
                    <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/admin' }">工作111台</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(crumb, i) in crumbs" :key="i">{{crumb}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="c-userinfo">
                <el-dropdown>
                    <span><i class="fa fa-user-circle"></i>admin <i class="fa fa-chevron-down"></i></span>
                    <el-dropdown-menu class="c-user-action" slot="dropdown">
                        <el-dropdown-item> 修改密码 <i class="fa fa-edit"></i></el-dropdown-item>
                        <el-dropdown-item> 退出系统 <i class="fa fa-sign-out"></i></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="c-side">
            <el-menu router="true" class="c-menu" @open="handleOpen" @close="handleClose">
                <el-menu-item index="/" class="c-home-menu"><i class="fa fa-desktop"></i>工作台</el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="fa fa-balance-scale"></i>交易</template>
                    <el-menu-item index="/trade/sale-order" style="text-align: center">销售订单</el-menu-item>
                    <el-menu-item index="/trade/purchase-order-index" style="text-align: center">采购订单</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="fa fa-list"></i>商品</template>
                    <el-menu-item index="/item" style="text-align: center">商品管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="fa fa-file-text-o"></i>内容</template>
                    <el-menu-item index="/article/index" style="text-align: center">文章管理</el-menu-item>
                    <el-menu-item index="/article/category-index" style="text-align: center">分类管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="fa fa-user-circle-o"></i>会员</template>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="fa fa-bar-chart"></i>统计</template>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title"><i class="fa fa-cogs"></i>系统</template>
                </el-submenu>
            </el-menu>
        </div>
        <div class="c-page">
            <router-view></router-view>
        </div>
        <div class="c-bottom">
            <div class="c-copyright">
                &copy; 2017 淘权网 版权所有 苏ICP备15054372号 增值电信业务经营许可证：苏B2-20170062
            </div>
        </div>
    </div>
</template>

<script>
    export default {
//        data () {
//            crumbs: []
//        },
        watch: {
            "$route" (to, from) {
                this.crumbs = to.name
                //console.log(to)
            }
        },
        mounted () {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }

//        beforeCreate () {
//            console.log("beforeCreate")
//        },
//        created () {
//            console.log("created")
//        },
//        beforeMount () {
//            console.log("beforeMount")
//        },
//        mounted () {
//            console.log("mounted")
//        },
//        beforeUpdate () {
//            console.log("beforeUpdate")
//        },
//        updated () {
//            console.log("updated")
//        },
//        activated () {
//            console.log("activated")
//        },
//        deactivated () {
//            console.log("deactivated")
//        },
//        beforeDestroy () {
//            console.log("beforeDestroy")
//        },
//        destroyed () {
//            console.log("destroyed")
//        }
    }
</script>