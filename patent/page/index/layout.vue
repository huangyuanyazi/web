<template>
    <div class="c-patent">
        <div class="c-top">
            <div class="c-logo">专利查询系统</div>
            <div class="c-user">欢迎您：{{username}}&nbsp;&nbsp;<el-button type="text" @click="changeUser">换个用户名</el-button></div>
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
                username: null
            }
        },
        mounted () {
            this.username = this.$loginUser[0]
        },
        methods: {
            changeUser () {
                location.href = '/login'
            }
        }
    }
</script>