<template>
    <div class="c-patent-detail">
        <div class="c-header">
            <div class="c-left">
                <div class="c-title">专利详情</div>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form>
                <tq-form-item label="专利号：" label-width="120px">
                    <div class="c-form-item-text">{{patent.sn}}</div>
                </tq-form-item>
                <tq-form-item label="专利名称：" label-width="120px">
                    <div class="c-form-item-text">{{patent.name}}</div>
                </tq-form-item>
                <tq-form-item label="申请进度：" label-width="120px"></tq-form-item>
                <el-steps :space="80" direction="vertical" :active="2" style="padding-left: 120px;">
                    <el-step title="等待申请费" description="专利文件专利局已经受理，等待我方缴纳申请费，我方会及时安排缴费，请耐心等待。"></el-step>
                    <el-step title="等待提案" description="申请文件已经缴纳申请费，开始等待专利局分配审查员审查。"></el-step>
                    <el-step title="分类待提取" description="专利申请文件已经完成专业领域分类，等待审查员接受案件。"></el-step>
                </el-steps>
            </tq-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentDetail',
        data () {
            return {
                patent: {
                    id: 1,
                    name: '一种带搅拌洗刷装置的大豆清洗设备',
                    sn: '2016213367244'
                }
            }
        },
        mounted () {
            let id = this.$route.params.id
            this.$http.get('/cs-patents/' + id).then(res => {
                this.patent = res.data
            })
        },
        methods: {
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>