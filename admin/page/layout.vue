<template>
    <div class="c-admin">
        <div class="c-top">
            <div class="c-crumb">
                <el-breadcrumb>
                    <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(crumb, i) in crumbs" :key="i">{{crumb}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="c-user">
                <el-dropdown @command="userCommand">
                    <span><i class="fa fa-user-circle"></i>admin <i class="fa fa-chevron-down"></i></span>
                    <el-dropdown-menu class="c-user-action" slot="dropdown">
                        <el-dropdown-item command="changePassword"> 修改密码 <i class="fa fa-edit"></i></el-dropdown-item>
                        <el-dropdown-item command="logout"> 退出系统 <i class="fa fa-sign-out"></i></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="c-side">
            <div class="c-logo"><a href="/" target="_blank">淘权网</a></div>
            <el-menu :router="true" theme="dark" class="c-menu" @open="handleOpen" @close="handleClose">
                <el-menu-item index="/" class="c-home-menu"><i class="fa fa-desktop"></i>工作台</el-menu-item>
                <!--
                <el-submenu index="trade">
                    <template slot="title"><i class="fa fa-balance-scale"></i>交易</template>
                </el-submenu>
                -->
                <el-submenu index="item">
                    <template slot="title"><i class="fa fa-list"></i>商品</template>
                    <el-menu-item index="/item/item-index">商品管理</el-menu-item>
                    <el-menu-item index="/item/category-index">分类管理</el-menu-item>
                </el-submenu>
                <el-submenu index="content">
                    <template slot="title"><i class="fa fa-file-text-o"></i>内容</template>
                    <el-menu-item index="/content/article-index">文章管理</el-menu-item>
                    <!--
                    <el-menu-item index="/content/adv-index">广告管理</el-menu-item>
                    -->
                </el-submenu>
                <el-submenu index="patent">
                    <template slot="title"><i class="fa fa-book"></i>专利</template>
                    <el-menu-item index="/patent/patent-index">专利管理</el-menu-item>
                </el-submenu>
                <el-submenu index="user">
                    <template slot="title"><i class="fa fa-user-circle-o"></i>用户</template>
                    <el-menu-item index="/user/user-index">用户管理</el-menu-item>
                    <el-menu-item index="/user/role-index">角色管理</el-menu-item>
                </el-submenu>
                <el-submenu index="statistic">
                    <template slot="title"><i class="fa fa-bar-chart"></i>统计</template>
                </el-submenu>
                <el-submenu index="system">
                    <template slot="title"><i class="fa fa-cogs"></i>系统</template>
                    <el-menu-item index="/system/setting-index">网站设置</el-menu-item>
                    <el-menu-item index="/system/menu-index">界面管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="c-page">
            <keep-alive :include="/^Tq.*Index$/">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqLayout',
        data () {
            return {
                crumbs: []
            }
        },
        components: {

        },
        watch: {
            "$route" (to, from) {
                this.crumbs = to.meta.crumbs
            }
        },
        mounted () {

        },
        methods: {
            handleOpen (key, keyPath) {

            },
            handleClose (key, keyPath) {

            },
            userCommand (command) {
                if("changePassword" == command) {

                } else if("logout" == command) {
                    location.href = "/admin/logout"
                }
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