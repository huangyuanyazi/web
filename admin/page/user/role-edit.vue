<template>
    <div class="c-user-role-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}角色</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="role" label-width="80px">
                        <el-form-item label="名称" style="width: 300px">
                            <el-input v-model="role.name"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-radio v-model="role.type" :label="1">后台角色</el-radio>
                            <el-radio v-model="role.type" :label="2">店铺角色</el-radio>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="role.description"></el-input>
                        </el-form-item>
                        <!--
                        <el-form-item label="资源权限">
                            <el-tree ref="resourceTree" :data="resources" node-key="id" :props="defaultProps" :default-expand-all="false" show-checkbox :check-strictly="true"></el-tree>
                        </el-form-item>
                        -->
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
        name: 'TqRoleEdit',
        data () {
            return {
                id: 0,
                role: {
                    type: 1
                },
                //resources: [],
                menus: [],
                menuProps: {
                    children: 'children',
                    label: 'description'
                }
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                let loading = this.$loading({ target: '.c-main' })
                this.id = this.$route.params.id
                this.$http.get("/roles/" + this.id).then(rolesRes => {
                    this.role = rolesRes.data
                    //this.$refs.resourceTree.setCheckedKeys(JSON.parse(rolesRes.data.resource_ids));
                    if(rolesRes.data.menu_ids)
                        this.$refs.menuTree.setCheckedKeys(JSON.parse(rolesRes.data.menu_ids))
                    loading.close()
                })
            }
            /*
            this.$http.get('/resources/tree').then(resourcesRes => {
                this.resources = resourcesRes.data
            })
            */
            this.$http.get('/menus/tree').then(menusRes => {
                this.menus = menusRes.data
            })

        },
        methods: {
            save () {
                //this.role.resource_ids = JSON.stringify(this.$refs.resourceTree.getCheckedKeys())
                this.role.menu_ids = JSON.stringify(this.$refs.menuTree.getCheckedKeys())
                if(this.id > 0) {
                    this.$http.put("/roles/" + this.id, this.role).then(rolesRse => {
                        this.$router.go(-1)
                    })
                } else {
                    this.$http.post("/roles", this.role).then(rolesRse => {
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