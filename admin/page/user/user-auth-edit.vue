<template>
    <div class="c-user-menu-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">分配权限</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="所属角色">
                            <el-select v-model="roleId" @change="changeRole" placeholder="请选择">
                                <el-option v-for="role in roles" :key="role.id" :label="role.description" :value="role.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="界面权限">
                            <el-tree ref="menuTree" :data="menus" node-key="id" :props="menuProps" :default-expand-all="true" show-checkbox :check-strictly="true"></el-tree>
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
        name: 'TqUserAuthEdit',
        data () {
            return {
                userId: 0,
                roleId: '',
                menuIds: [],
                roles: [],
                menus: [],
                menuProps: {
                    children: 'children',
                    label: 'description'
                },
                userRoleId: 0
            }
        },
        watch: {
            menuIds (val) {
                this.$refs.menuTree.setCheckedKeys(val)
            }
        },
        mounted () {
            this.userId = this.$route.params.user_id
            this.$http.get('/role-assignments', {
                params: {
                    user_id: this.userId
                }
            }).then(assignmentsRes => {
                if (assignmentsRes.data.length > 0) {
                    this.roleId = assignmentsRes.data[0].role_id
                    this.userRoleId = assignmentsRes.data[0].id
                }
            })
            this.$http.get('/menu-assignments', {
                params: {
                    user_id: this.userId
                }
            }).then(assignmentsRes => {
                let menuAssignments = assignmentsRes.data
                if (menuAssignments.length > 0) {
                    for (let menuAssignment of menuAssignments) {
                        this.menuIds.push(menuAssignment.menu_id)
                    }
                }
            })

            this.$http.get('/roles', {
                params: {
                    'offset': 0,
                    'limit': 1000
                }
            }).then(rolesRes => {
                this.roles = rolesRes.data
            })
            this.$http.get('/menus/tree').then(menusRes => {
                this.menus = menusRes.data
            })
        },
        methods: {
            save () {
                //console.log(this.userId)
                //console.log(this.roleId)
                //console.log(this.menuIds)
                this.$http.put('/admins/' + this.userId + '/menus', {
                    menu_ids: this.menuIds
                }).then(menusRes => {
                    if (this.userRoleId > 0) {
                        return this.$http.put('/role-assignments/' + this.userRoleId, {
                            user_id: this.userId,
                            role_id: this.roleId
                        })
                    } else {
                        return this.$http.post('/role-assignments', {
                            user_id: this.userId,
                            role_id: this.roleId
                        })
                    }
                }).then(assignmentsRes => {
                    this.$router.go(-1)
                })
            },
            changeRole (val) {
                let menuIds = []
                this.$http.get('/roles/' + val).then(rolesRes => {
                    let role = rolesRes.data
                    if (role.menu_ids) {
                        for (let menuId of JSON.parse(role.menu_ids)) {
                            if (-1 === menuIds.indexOf(menuId))
                                menuIds.push(menuId)
                        }
                    }
                    this.menuIds = menuIds
                })
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>