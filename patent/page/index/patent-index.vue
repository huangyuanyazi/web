<template>
    <div class="c-patent-index">
        <div class="c-header">
            <div class="c-left">
                <div class="c-title">我的专利</div>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.sn" size="small" placeholder="专利号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searcher.name" size="small" placeholder="专利名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="patents" border class="c-grid">
                <el-table-column prop="sn" label="专利号" width="160"></el-table-column>
                <el-table-column prop="name" label="专利名称"></el-table-column>
                <el-table-column prop="status" label="申请进度" width="160"></el-table-column>
                <el-table-column fixed="right" label="操作" width="90">
                    <template scope="scope">
                        <el-button type="text" @click="view(scope.row.id)" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
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
                statusNames: [],
                searcher: {}
            }
        },
        activated () {
            this.search()
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
                    'sort': '-id',
                    'username': this.$loginUser[0],
                    'mobile': this.$loginUser[1]
                }
                if (this.searcher.sn)
                    params.sn = this.searcher.sn
                if (this.searcher.name)
                    params.name = '~' + this.searcher.name
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
            view (id) {
                this.$router.push('/patent-detail/' + id)
            }
        }
    }
</script>