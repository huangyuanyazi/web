<template>
    <div class="c-patent-status-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">更新专利状态</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentStatusEdit',
        data () {
            return {

            }
        },
        methods: {
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>