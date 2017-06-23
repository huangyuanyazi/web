<template>
    <div class="c-system-menu-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增顶级</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-tree :data="menus" node-key="id" :props="menuProps" :default-expand-all="true" :renderContent="renderContent" class="c-tree"></el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqMenuIndex',
        data () {
            return {
                menus: [],
                menuProps: {
                    children: 'children',
                    label: 'description'
                },
                dialogVisible: false
            }
        },
        mounted () {
            this.$http.get('/menus/tree').then(menusRes => {
                this.menus = menusRes.data
            })
        },
        methods: {
            renderContent (h, { node, data, store }) {
                return h("span", {"class": "el-tree-node__label-1", style: "vertical-align:middle"}, [
                    h("span", node.label),
                    h("span", {style: "float:right"}, [
                        h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.modify(event, node)}, style: "margin-right:6px"}, "修改"),
                        h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.createChild(event, node)}, style: "margin-right:6px"}, "新增子级"),
                        h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.remove(event, node)}, style: "margin-right:10px"}, "删除")
                    ])
                ])
            },
            create () {
                this.$router.push("/system/menu-edit")
            },
            modify (event, node) {
                event.stopPropagation() //阻止事件冒泡，防止点击时展开或收缩节点
                let id = node.data.id
                this.$router.push("/system/menu-edit/" + id)
            },
            createChild (event, node) {
                event.stopPropagation()
                let id = node.data.id
                //node.store.append({ id: cid++, label: "测试", children: [] }, node.data)
                this.$router.push({path: "/system/menu-edit", query: {parent_id: id}})
            },
            remove (event, node) {
                event.stopPropagation()
                let id = node.data.id
                this.$confirm('确认删除？').then(_ => {
                    this.$http.delete('/menus/' + id).then(menusRes => {
                        node.store.remove(node.data)
                    })
                }).catch(_ => {
                    console.log(_)
                })
            }
        }
    }
</script>