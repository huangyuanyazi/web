<template>
    <div class="c-adv-position-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}位置</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="position" label-width="80px">

                        <el-form-item label="助记代码">
                            <el-input v-model="position.code"></el-input>
                        </el-form-item>

                        <el-form-item label="描述">
                            <el-input v-model="position.description"></el-input>
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
        name: 'TqAdvPositionEdit',
        data () {
            return {
                id: 0,
                position: {}
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