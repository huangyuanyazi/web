<template>
    <div class="c-article-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="createTop"><i class="fa fa-plus"></i>新增顶级</el-button>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="toArticle"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-tree :data="categories" node-key="id" :props="defaultProps" :renderContent="renderContent" class="c-tree"></el-tree>
        </div>
    </div>
</template>

<script>
    let cid = 1000

    export default {
        name: 'TqArticleCategoryIndex',
        data () {
            return {
                categories: [{
                    id: 8,
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    id: 99,
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            id: 80,
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted () {

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
            create (parentId) { //添加节点的公共方法

            },
            createTop () {
                //this.$router.push({path: "/content/article-category-edit", query: {parent_id: 0}})
                this.$router.push("/content/article-category-edit")
            },
            modify (event, node) {
                event.stopPropagation() //阻止事件冒泡，防止点击时展开或收缩节点
                let id = node.data.id
                console.log("修改节点：" + id)
            },
            createChild (event, node) {
                event.stopPropagation()
                let id = node.data.id
                //console.log("添加子节点：" + id)
                //node.store.append({ id: cid++, label: "测试", children: [] }, node.data)
                this.$router.push({path: "/content/article-category-edit", query: {parent_id: id}})
            },
            remove (event, node) {
                event.stopPropagation()
                let id = node.data.id
                console.log("删除节点：" + id)
                node.store.remove(node.data)
            },
            toArticle () {
                this.$router.push("/content/article-index")
            }
        }
    }
</script>