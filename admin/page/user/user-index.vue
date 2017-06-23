<template>
    <div class="c-user-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增用户</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="users" class="c-grid">
                <!--
                <el-table-column fixed type="selection" width="46"></el-table-column>
                -->
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="username" label="用户名" width="180"></el-table-column>
                <el-table-column prop="real_name" label="姓名" ></el-table-column>
                <el-table-column prop="mobile" label="手机号码" ></el-table-column>
                <el-table-column prop="email" label="邮箱" ></el-table-column>
                <el-table-column label="注册时间" width="180">
                    <template scope="scope">
                        {{scope.row.registered_at | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="130">
                    <template scope="scope">
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                        <el-button type="text" @click="userAuthAssignment(scope.row.id)" size="small">分配权限</el-button>
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
        name: 'TqUserIndex',
        data () {
            return {
                users: [],
                currentPage: 1,
                pageSize: 20,
                totalCount: 0
            }
        },
        activated () {
            this.search()
        },
        mounted () {

        },
        methods: {
            search (page) {
                if(page)
                    this.currentPage = parseInt(page)
                let loading = this.$loading({ target: '.c-main' })
                this.$http.get('/admins', {
                    params: {
                        'page': this.currentPage,
                        'per-page': this.pageSize
                    }
                }).then(adminsRes => {
                    this.users = adminsRes.data
                    this.totalCount = parseInt(adminsRes.headers['x-pagination-total-count'])
                    loading.close()
                }).catch(adminsErr => {
                    //console.log(adminsErr.response)
                })
            },
            create () {
                this.$router.push('/user/user-edit')
            },
            modify (id) {
                this.$router.push('/user/user-edit/' + id)
            },
            userAuthAssignment (id) {
                this.$router.push('/user/user-auth-edit/' + id)
            },
            changePage (page) {
                this.search(page)
            }
        }
    }
</script>