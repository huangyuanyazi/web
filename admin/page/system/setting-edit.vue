<template>
    <div class="c-system-setting-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}配置项</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="setting" label-width="80px">
                        <el-form-item label="说明">
                            <el-input v-model="setting.description"></el-input>
                        </el-form-item>
                        <el-form-item label="键">
                            <el-input v-model="setting.key"></el-input>
                        </el-form-item>
                        <el-form-item label="值">
                            <el-input v-model="setting.value"></el-input>
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
        name: 'TqSettingEdit',
        data () {
            return {
                id: 0,
                setting: {}
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                this.id = this.$route.params.id
                this.$http.get('/settings/' + this.id).then(settingsRes => {
                    this.setting = settingsRes.data
                })
            }
        },
        methods: {
            save () {
                if (this.id > 0) {
                    this.$http.put('/settings/' + this.id, this.setting).then(settingsRes => {
                        this.$router.go(-1)
                    })
                } else {
                    this.$http.post('/settings', this.setting).then(settingsRes => {
                        this.$router.go(-1)
                    })
                }
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>