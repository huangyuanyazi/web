<template>
    <div class="c-item-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}商品</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form ref="form" model="Item" :data="item">
                <tq-form-item label="名称">
                    <el-input v-model="item.name"></el-input>
                </tq-form-item>
                <tq-form-item label="关键词">
                    <el-input v-model="item.keywords"></el-input>
                </tq-form-item>
                <tq-form-item label="店铺">
                    <el-input v-model="item.store_id"></el-input>
                </tq-form-item>
                <tq-form-item label="分类">
                    <el-input v-model="item.item_class_id"></el-input>
                </tq-form-item>
                <tq-form-item label="价格">
                    <el-input v-model="item.price"></el-input>
                </tq-form-item>
                <tq-form-item label="描述" class="c-editor-wrap">
                    <tq-editor v-model="item.description" image-upload-url="2222"></tq-editor>
                </tq-form-item>
                <tq-form-item label="状态">
                    <el-input v-model="item.status"></el-input>
                </tq-form-item>
                <tq-form-item label="备注">
                    <el-input v-model="item.remark"></el-input>
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
        name: 'TqItemEdit',
        data () {
            return {
                id: 0,
                item: {}
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                this.id = this.$route.params.id
                this.$http.get("/items/" + this.id).then(itemsRes => {
                    this.item = itemsRes.data
                })
            }
        },
        methods: {
            save () {
                console.log(this.item)
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>