<template>
    <div class="c-patent-detail">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">专利详情</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form ref="patentDetail">
                <div>
                    <div class="c-group-title">基本信息</div>
                    <tq-form-item name="internal_sn" label="内部编号：">
                        <div style="margin-top: 7px;">{{patent.internal_sn}}</div>
                    </tq-form-item>
                    <tq-form-item name="username" label="用户名：">
                        <div style="margin-top: 7px;">{{patent.username}}</div>
                    </tq-form-item>
                    <tq-form-item name="payment_status_id" label="付款状态：">
                        <div style="margin-top: 7px;">{{paymentStatusNames[patent.payment_status_id]}}</div>
                    </tq-form-item>
                    <tq-form-item name="sn" label="专利号：">
                        <div style="margin-top: 7px;">{{patent.sn}}</div>
                    </tq-form-item>
                    <tq-form-item name="name" label="专利名称：">
                        <div style="margin-top: 7px;">{{patent.name}}</div>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">联系人</div>
                    <tq-form-item name="contact" label="姓名：">
                        <div style="margin-top: 7px;">{{patent.contact}}</div>
                    </tq-form-item>
                    <tq-form-item name="email" label="邮箱：">
                        <div style="margin-top: 7px;">{{patent.email}}</div>
                    </tq-form-item>
                    <tq-form-item name="mobile" label="手机：">
                        <div style="margin-top: 7px;">{{patent.mobile}}</div>
                    </tq-form-item>
                    <tq-form-item name="qq" label="QQ：">
                        <div style="margin-top: 7px;">{{patent.qq}}</div>
                    </tq-form-item>
                    <tq-form-item name="weixin" label="微信：">
                        <div style="margin-top: 7px;">{{patent.weixin}}</div>
                    </tq-form-item>
                    <tq-form-item name="address" label="证书接收地址：">
                        <div style="margin-top: 7px;">{{patent.address}}</div>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">发明人</div>
                    <tq-form-item name="first_inventor_name" label="第一发明人姓名">
                        <div style="margin-top: 7px;">{{patent.first_inventor_name}}</div>
                    </tq-form-item>
                    <tq-form-item name="first_inventor_id" label="身份证号">
                        <div style="margin-top: 7px;">{{patent.first_inventor_id}}</div>
                    </tq-form-item>
                    <tq-form-item name="other_inventor_names" label="其他发明人姓名">
                        <div style="margin-top: 7px;">{{patent.other_inventor_names}}</div>
                    </tq-form-item>
                </div>

                <div>
                    <div class="c-group-title">第一专利权人</div>
                    <tq-form-item name="first_holder_name" label="姓名">
                        <div style="margin-top: 7px;">{{patent.first_holder_name}}</div>
                    </tq-form-item>
                    <tq-form-item name="first_holder_id" label="身份证号码">
                        <div style="margin-top: 7px;">{{patent.first_holder_id}}</div>
                    </tq-form-item>
                    <tq-form-item name="first_holder_address" label="地址">
                        <div style="margin-top: 7px;">{{patent.first_holder_address}}</div>
                    </tq-form-item>
                    <tq-form-item name="first_holder_zip_code" label="邮编">
                        <div style="margin-top: 7px;">{{patent.first_holder_zip_code}}</div>
                    </tq-form-item>
                </div>

                <div v-for="(otherHolder, index) in patent.other_holders" :key="index">
                    <div class="c-group-title">第{{zhNumbers[index + 2]}}专利权人</div>
                    <tq-form-item label="姓名">
                        <div style="margin-top: 7px;">{{otherHolder.name}}</div>
                    </tq-form-item>
                    <tq-form-item label="身份证号">
                        <div style="margin-top: 7px;">{{otherHolder.id}}</div>
                    </tq-form-item>
                </div>


            </tq-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentDetail',
        data () {
            return {
                patent: {},
                paymentStatuses: [],
                paymentStatusNames: {},
                zhNumbers: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
            }
        },
        mounted () {
            let loading = this.$loading({ target: '.c-main' })
            this.$http.get('/cs-payment-statuses').then(paymentStatusesRes => {
                this.paymentStatuses = paymentStatusesRes.data
                for (let status of paymentStatusesRes.data) {
                    this.paymentStatusNames[status.id] = status.name
                }
                return this.$http.get("/cs-patents/" + this.$route.params.id)
            }).then(patentsRes => {
                this.patent = patentsRes.data
                loading.close()
            })
        },
        methods: {
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