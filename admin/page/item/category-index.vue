<template>
    <div class="c-item-category-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增顶级</el-button>
            </div>
            <div class="c-right"></div>
        </div>
        <div class="c-main">
            <el-tree :data="categories" node-key="id" :props="defaultProps" :default-expand-all="true" :renderContent="renderContent" class="c-tree"></el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqCategoryIndex',
        data () {
            return {
                categories: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted () {
            this.$http.get('/item-classes/tree').then(classesRes => {
                this.categories = classesRes.data
            })
        },
        methods: {
            renderContent (h, { node, data, store }) {
                return h("span", {"class":"el-tree-node__label-1", style:"vertical-align:middle"}, [
                    h("span", node.label),
                    h("span", {style:"margin-left:6px;color:#999"}, '#' + node.data.id),
                    h("span", {style:"float:right"}, [
                        h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.modify(event, node)}, style: "margin-right:6px"}, "修改")
                        //h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.createChild(event, node)}, style: "margin-right:6px"}, "新增子级"),
                        //h("el-button", {attrs: {size: "small"}, on: {"click": (event) => this.remove(event, node)}, style: "margin-right:10px"}, "删除")
                    ])
                ])
            },
            create () {
                this.$router.push('/item/category-edit')
            },
            modify (event, node) {
                event.stopPropagation() //阻止事件冒泡，防止点击时展开或收缩节点
                let id = node.data.id
                console.log("修改节点：" + id)
                this.$router.push('/item/category-edit/' + id)
            },
            createChild (event, node) {
                event.stopPropagation()
                let id = node.data.id
                console.log("添加子节点：" + id)
                //node.store.append({ id: cid++, label: "测试", children: [] }, node.data)
            },
            remove (event, node) {
                event.stopPropagation()
                let id = node.data.id
                console.log("删除节点：" + id)
                //node.store.remove(node.data)
            }
        }
    }
</script>