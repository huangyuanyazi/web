<template>
    <div class="c-adv-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}广告</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="adv" label-width="80px">
                        <el-form-item label="代码">
                            <el-input v-model="adv.code"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="adv.description" type="textarea" :rows="5"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="save">保存提交</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqAdvEdit',
        data () {
            return {
                id: 0,
                adv: {}
            }
        },
        methods: {
            save () {

            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>