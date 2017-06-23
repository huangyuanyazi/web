<template>
    <div class="c-item-category-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}分类</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form ref="itemClassForm" model="ItemClass" :data="itemClass">
                <tq-form-item name="parent_id" label="父类ID">
                    <el-input v-model="itemClass.parent_id" :readonly="true" style="width: 200px;"></el-input>
                </tq-form-item>
                <tq-form-item name="name" label="名称">
                    <el-input v-model="itemClass.name"></el-input>
                </tq-form-item>
                <tq-form-item name="code" label="助记代码">
                    <el-input v-model="itemClass.code" style="width: 200px;"></el-input>
                </tq-form-item>
                <!--
                <tq-form-item label="商品属性">
                    <el-input v-model="attributes"></el-input>
                </tq-form-item>
                <tq-form-item label="商品规格">
                    <el-input v-model="specs"></el-input>
                </tq-form-item>
                <tq-form-item label="关键词">
                    <el-input v-model="keywords"></el-input>
                </tq-form-item>
                -->
                <tq-form-item label="分类说明">
                    <el-input v-model="itemClass.description"></el-input>
                </tq-form-item>
                <tq-form-item name="index_template_path" label="首页模板路径">
                    <el-input v-model="itemClass.index_template_path"></el-input>
                </tq-form-item>
                <tq-form-item name="search_template_path" label="搜索结果模板路径">
                    <el-input v-model="itemClass.search_template_path"></el-input>
                </tq-form-item>
                <tq-form-item name="detail_template_path" label="商品模板路径">
                    <el-input v-model="itemClass.detail_template_path"></el-input>
                </tq-form-item>
                <tq-form-item name="order" label="排序值">
                    <el-input v-model="itemClass.order" style="width: 200px;"></el-input>
                </tq-form-item>
                <tq-form-item>
                    <el-button type="primary" @click="save">保存提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </tq-form-item>
            </tq-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqCategoryEdit',
        data () {
            return {
                id: 0,
                itemClass: {},
                attributes: '',
                specs: '',
                keywords: ''
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                this.id = this.$route.params.id
                this.$http.get("/item-classes/" + this.id).then(classesRes => {
                    this.itemClass = classesRes.data
                })
            } else {
                let parent_id = this.$route.query.parent_id
                if(!parent_id)
                    parent_id = 0
                this.$set(this.itemClass, 'parent_id', parent_id)
            }
        },
        methods: {
            save () {
                this.$refs.itemClassForm.validate(valid => {
                    if (valid) {
                        if (this.id > 0) {
                            this.$http.put('/item-classes/' + this.id, this.itemClass).then(classesRes => {
                                this.$router.go(-1)
                            }).catch(classesErr => {
                                alert(JSON.stringify(classesErr.response.data))
                            })
                        }
                    }
                })
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>