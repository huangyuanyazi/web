<template>
    <div class="c-user-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}用户</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="user" label-width="80px">
                        <el-form-item label="用户名" style="width: 300px">
                            <el-input v-model="user.username"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名" style="width: 300px">
                            <el-input v-model="user.real_name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" style="width: 300px">
                            <el-input v-model="user.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" style="width: 300px">
                            <el-input v-model="user.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" style="width: 300px">
                            <el-input v-model="user.email"></el-input>
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
    //let Validation = require('../../../../libs/validation')

    export default {
        name: 'TqUserEdit',
        data () {
            return {
                id: 0,
                user: {}
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                let loading = this.$loading({ target: '.c-main' })
                this.id = this.$route.params.id
                this.$http.get("/admins/" + this.id).then(response => {
                    this.user = response.data
                    loading.close()
                })
            }
        },
        methods: {
            save () {
                if (this.id > 0) {
                    this.$http.put('/admins/' + this.id, this.user).then(adminsRes => {
                        this.$router.go(-1)
                        //this.$router.push('/user/user-index')
                    }).catch(adminsErr => {
                        alert(JSON.stringify(adminsErr.response.data))
                    })
                } else {
                    /*
                    let validation = new Validation('Admin', this.user)
                    validation.validateField('username', '填写的用户名').then(result => {
                        console.log(result)
                    })
                    validation.validateField('password', '填写的密码').then(result => {
                        console.log(result)
                    })*/
                    this.user.status = 10
                    this.$http.post('/admins', this.user).then(adminsRes => {
                        this.$router.go(-1)
                    }).catch(adminsErr => {
                        alert(JSON.stringify(adminsErr.response.data))
                    })
                }
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>