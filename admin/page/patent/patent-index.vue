<template>
    <div class="c-patent-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增专利</el-button>
                <el-button type="primary" size="small" class="c-button" @click="modifyStatuses"><i class="fa fa-upload"></i>更新状态</el-button>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.username" size="small" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searcher.internal_sn" size="small" placeholder="内部编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="patents" border class="">
                <el-table-column prop="id" label="#" width="80"></el-table-column>
                <el-table-column prop="internal_sn" label="内部编号" width="120"></el-table-column>
                <el-table-column prop="username" label="用户名" width="130"></el-table-column>
                <el-table-column label="付款状态" width="100">
                    <template scope="scope">
                        {{paymentStatusNames[scope.row.payment_status_id]}}
                    </template>
                </el-table-column>
                <el-table-column label="联系人">
                    <el-table-column prop="contact" label="姓名" width="120"></el-table-column>
                    <el-table-column prop="mobile" label="手机" width="130"></el-table-column>
                    <el-table-column prop="qq" label="QQ" width="130"></el-table-column>
                    <el-table-column prop="weixin" label="微信" width="130"></el-table-column>
                </el-table-column>
                <el-table-column prop="sn" label="专利号" width="150"></el-table-column>
                <el-table-column prop="name" label="专利名称"></el-table-column>
                <el-table-column fixed="right" label="操作" width="130">
                    <template scope="scope">
                        <el-button type="text" @click="view(scope.row.id)" size="small">查看</el-button>
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <!--
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                    -->
                </div>
                <div class="c-right">
                    <el-pagination @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentIndex',
        data () {
            return {
                patents: [],
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                paymentStatuses: [],
                paymentStatusNames: {},
                searcher: {
                    username: null,
                    internal_sn: null
                }
            }
        },
        activated () {
            this.search()
        },
        mounted () {
            this.$http.get('/cs-payment-statuses').then(paymentStatusesRes => {
                this.paymentStatuses = paymentStatusesRes.data
                for (let status of paymentStatusesRes.data) {
                    this.paymentStatusNames[status.id] = status.name
                }
            })
        },
        methods: {
            search (page) {
                let loading = this.$loading({ target: '.c-main' })
                if (page) {
                    this.currentPage = parseInt(page)
                }
                let params = {
                    'page': this.currentPage,
                    'per-page': this.pageSize,
                    'sort': '-id'
                }
                if (this.searcher.username)
                    params.username = this.searcher.username
                if (this.searcher.internal_sn)
                    params.internal_sn = this.searcher.internal_sn
                this.$http.get('/cs-patents', { params }).then(patentsRes => {
                    this.patents = patentsRes.data
                    this.totalCount = parseInt(patentsRes.headers['x-pagination-total-count'])
                    loading.close()
                })
            },
            doSearch () {
                if (1 === this.currentPage) {
                    this.search()
                } else {
                    this.currentPage = 1
                }
            },
            changePage (page) {
                this.search(page)
            },
            create () {
                this.$router.push('/patent/patent-edit')
            },
            view (id) {
                this.$router.push('/patent/patent-detail/' + id)
            },
            modify (id) {
                this.$router.push('/patent/patent-edit/' + id)
            },
            modifyStatuses () {
                this.$router.push('/patent/patent-status-batch-modify')
            }
        }
    }
</script>