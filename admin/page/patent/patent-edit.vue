<template>
    <div class="c-patent-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}专利</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form v-show="1 === step">
                <tq-form-item>
                    <el-upload action="/cs-patents/excel" name="excel" :show-file-list="false" :http-request="httpRequest" drag>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">点击上传Excel文件</div>
                        <div class="el-upload__tip" slot="tip" style="margin-top: 0">只能上传xlsx文件，且不超过20MB</div>
                    </el-upload>
                </tq-form-item>
                <tq-form-item>
                    <div style="width: 360px; text-align: center"><el-button @click="cancel">取消</el-button></div>
                </tq-form-item>
            </tq-form>
            <tq-form ref="patentForm" model="CsPatent" :data="patent" v-show="2 === step">
                <div>
                    <div class="c-group-title">基本信息</div>
                    <tq-form-item name="internal_sn" label="内部编号">
                        <el-input v-model="patent.internal_sn"></el-input>
                    </tq-form-item>
                    <tq-form-item name="username" label="用户名">
                        <el-input v-model="patent.username"></el-input>
                    </tq-form-item>
                    <tq-form-item name="payment_status_id" label="付款状态">
                        <el-radio-group v-model="patent.payment_status_id">
                            <el-radio v-for="status in paymentStatuses" :label="status.id" :key="status.id">{{status.name}}</el-radio>
                        </el-radio-group>
                    </tq-form-item>
                    <tq-form-item name="sn" label="专利号">
                        <el-input v-model="patent.sn"></el-input>
                    </tq-form-item>
                    <tq-form-item name="name" label="专利名称">
                        <el-input v-model="patent.name"></el-input>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">联系人</div>
                    <tq-form-item name="contact" label="姓名">
                        <el-input v-model="patent.contact" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="email" label="邮箱">
                        <el-input v-model="patent.email" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="mobile" label="手机">
                        <el-input v-model="patent.mobile" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="qq" label="QQ">
                        <el-input v-model="patent.qq" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="weixin" label="微信">
                        <el-input v-model="patent.weixin" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="address" label="证书接收地址">
                        <el-input v-model="patent.address" :readonly="id > 0"></el-input>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">发明人</div>
                    <tq-form-item name="first_inventor_name" label="第一发明人姓名">
                        <el-input v-model="patent.first_inventor_name" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="first_inventor_id" label="身份证号">
                        <el-input v-model="patent.first_inventor_id" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="other_inventor_names" label="其他发明人姓名">
                        <el-input v-model="patent.other_inventor_names" :readonly="id > 0"></el-input>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">第一专利权人</div>
                    <tq-form-item name="first_holder_name" label="姓名">
                        <el-input v-model="patent.first_holder_name" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="first_holder_id" label="身份证号码">
                        <el-input v-model="patent.first_holder_id" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="first_holder_address" label="地址">
                        <el-input v-model="patent.first_holder_address" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item name="first_holder_zip_code" label="邮编">
                        <el-input v-model="patent.first_holder_zip_code" :readonly="id > 0"></el-input>
                    </tq-form-item>
                </div>

                <div v-for="(otherHolder, index) in patent.other_holders" :key="index">
                    <div class="c-group-title">第{{zhNumbers[index + 2]}}专利权人</div>
                    <tq-form-item label="姓名">
                        <el-input v-model="otherHolder.name" :readonly="id > 0"></el-input>
                    </tq-form-item>
                    <tq-form-item label="身份证号">
                        <el-input v-model="otherHolder.id" :readonly="id > 0"></el-input>
                    </tq-form-item>
                </div>
                <!--
                <tq-form-item>
                    <el-button>添加其他专利权人</el-button>
                </tq-form-item>
                -->

                <tq-form-item>
                    <el-button type="primary" @click="save">保存提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </tq-form-item>
            </tq-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentEdit',
        data () {
            return {
                id: 0,
                step: 1,
                patent: {
                    other_holders: []
                },
                paymentStatuses: [],
                zhNumbers: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
            }
        },
        mounted () {
            this.$http.get('/cs-payment-statuses').then(paymentStatusesRes => {
                this.paymentStatuses = paymentStatusesRes.data
            })
            if (this.$route.params.id > 0) {
                let loading = this.$loading({ target: '.c-main' })
                this.id = this.$route.params.id
                this.step = 2
                this.$http.get("/cs-patents/" + this.id).then(patentsRes => {
                    this.patent = patentsRes.data
                    loading.close()
                })
            }
        },
        methods: {
            httpRequest (options) {
                let data = new FormData()
                data.append(options.filename, options.file)
                this.$http.post(options.action, data).then(res => {
                    this.patent = res.data.item
                    if (!this.patent.payment_status_id)
                        this.$set(this.patent, 'payment_status_id', this.paymentStatuses[0].id)
                    this.step = 2
                }).catch(err => {
                    console.log(err.response.data)
                })
            },
            save () {
                console.log(this.id)
                /*
                this.$refs.patentForm.validate(valid => {
                    console.log(valid)
                })
                */
                if (this.id > 0) {
                    this.$http.put('/cs-patents/' + this.id, this.patent).then(res => {
                        this.$router.go(-1)
                    }).catch(err => {
                        console.log(err.response.data)
                    })
                } else {
                    this.$http.post('/cs-patents', this.patent).then(res => {
                        this.$router.go(-1)
                    }).catch(err => {
                        console.log(err.response.data)
                    })
                }
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .c-group-title {
        margin-bottom: 10px; padding: 10px 12px; background-color: #F9FAFC; border-radius: 5px;
    }
</style>