<template>
    <div class="c-role-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增角色</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="roles" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="type_name" label="类型" width="180">
                    <template scope="scope">
                        {{types[scope.row.type]}}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="view(scope.row.id)" size="small">查看</el-button>
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
                    <el-pagination @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqRoleIndex',
        data () {
            return {
                roles: [],
                types: {1: '后台角色', 2: '店铺角色'},
                currentPage: 0,
                pageSize: 20,
                totalCount: 0
            }
        },
        mounted () {
            this.search()
        },
        methods: {
            search (page) {
                if(page)
                    this.currentPage = parseInt(page)
                let loading = this.$loading({ target: '.c-main' })
                this.$http.get('/roles', {
                    params: {
                        'page': this.currentPage,
                        'per-page': this.pageSize
                    }
                }).then(rolesRes => {
                    this.roles = rolesRes.data
                    this.totalCount = parseInt(rolesRes.headers['x-pagination-total-count'])
                    loading.close()
                }).catch(rolesErr => {
                    //console.log(rolesErr.response)
                })
            },
            create () {
                this.$router.push("/user/role-edit")
            },
            view (id) {
                this.$router.push("/user/role-detail/" + id)
            },
            modify (id) {
                this.$router.push("/user/role-edit/" + id)
            },
            changePage (page) {
                this.search(page)
            }
        }
    }
</script>