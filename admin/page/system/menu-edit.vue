<template>
    <div class="c-system-menu-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}界面</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="menu" label-width="80px">
                        <el-form-item label="名称">
                            <el-input v-model="menu.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="menu.description"></el-input>
                        </el-form-item>
                        <el-form-item label="规则">
                            <el-input v-model="menu.rule"></el-input>
                        </el-form-item>
                        <el-form-item label="关联资源">
                            <el-tree ref="resourceTree" :data="resources" node-key="id" :props="resourceProps" show-checkbox :check-strictly="true" :default-expand-all="true" class="c-tree"></el-tree>
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
        name: 'TqMenuEdit',
        data () {
            return {
                id: 0,
                menu: {},
                resources: [],
                resourceProps: {
                    children: 'children',
                    label: 'description'
                }
            }
        },
        mounted () {
            let id = this.$route.params.id
            let parent_id = this.$route.query.parent_id
            if(parent_id)
                this.menu.parent_id = parent_id
            //console.log(id)
            this.$http.get('/resources/tree').then(resourcesRes => {
                //console.log(resourcesRes.data)
                this.resources = resourcesRes.data
            })
            if(id > 0) {
                this.id = id
                this.$http.get('/menus/' + id).then(menusRes => {
                    this.menu = menusRes.data
                    this.$refs.resourceTree.setCheckedKeys(JSON.parse(menusRes.data.resource_ids))
                })
            }
        },
        methods: {
            save () {
                this.menu.resource_ids = JSON.stringify(this.$refs.resourceTree.getCheckedKeys())
                if(this.id > 0) {
                    this.$http.put('/menus/' + this.id, this.menu).then(menusRes => {
                        this.$router.go(-1)
                    })
                } else {
                    this.$http.post('/menus', this.menu).then(menusRes => {
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