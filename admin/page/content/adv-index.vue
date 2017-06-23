<template>
    <div class="c-adv-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增广告</el-button>
                <el-button type="primary" size="small" class="c-button" @click="toPosition"><i class="fa fa-bars"></i>广告位管理</el-button>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.title" size="small" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searcher.position_id" size="small" placeholder="位置">
                            <el-option v-for="position in positions" :label="position.description" :value="position.id" :key="position.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="positions" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="adv_position_name" label="位置" width="180"></el-table-column>
                <el-table-column prop="title" label="标题" ></el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template scope="scope">
                        {{scope.row.created_at | date-format}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="view" size="small">查看</el-button>
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                </div>
                <div class="c-right">
                    <el-pagination @current-change="changePage" :current-page="currentPage" :page-size="perPage" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqAdvIndex',
        data () {
            return {
                searcher: {},
                positions: [],
                advs: [],
                currentPage: 0,
                perPage: 0,
                total: 0,
                activeName: {}
            }
        },
        mounted () {
            this.search(this.$route.params.page)
        },
        beforeRouteUpdate (to, from, next) {
            this.search(to.params.page)
            next()
        },
        methods: {
            search (page) {

            },
            create () {
                this.$router.push("/content/adv-edit")
            },
            view () {
                console.log("查看广告详情")
            },
            modify (id) {
                this.$router.push("/content/adv-edit/" + id)
            },
            changePage (page) {
                this.$router.push("/content/adv-index/" + page)
            },
            toPosition () {
                this.$router.push("/content/adv-position-index")
            }
        }
    }
</script>