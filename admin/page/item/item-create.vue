<template>
    <div class="c-item-create">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{'single' == type ? '新增' : '导入'}}商品</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="creater" :rules="rules" label-width="90px">
                        <el-form-item label="选择店铺" prop="store_id">
                            <el-select v-model="creater.store_id" filterable>
                                <el-option v-for="store in stores" :label="store.name" :value="store.id.toString()" :key="store.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--
                        <el-form-item label="选择分类" prop="item_class_id">
                            <el-radio-group v-model="creater.item_class_id">
                                <el-radio label="1">专利</el-radio>
                                <el-radio label="2">商标</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="导入模式" prop="mode">
                            <el-radio-group v-model="creater.mode">
                                <el-radio label="1">覆盖模式</el-radio>
                                <el-radio label="2">追加模式</el-radio>
                            </el-radio-group>
                            <div style="color: #999; font-size: 12px">覆盖模式：所选分类的在售商品完全采用Excel中的数据，当前在售商品将被下架</div>
                            <div style="color: #999; font-size: 12px">追加模式：将Excel中的数据追加到所选分类的在售商品中，当前在售商品不受影响</div>
                        </el-form-item>
                        -->
                        <el-form-item>
                            <el-button type="primary" @click="toNextStep">下一步，{{'single' == type ? '编辑商品' : '导入Excel'}}</el-button>
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
        name: 'TqItemCreate',
        data () {
            return {
                stores: [],
                itemClassIds: [],
                creater: {
                    store_id: null,
                    item_class_id: '1'
                },
                type: 'single',
                /*
                itemClasses: [{
                    id: 'zhinan1',
                    name: '指南1',
                    children: [{
                        id: 'shejiyuanze1',
                        name: '设计原则1'
                    }]
                },{
                    id: 'zhinan2',
                    name: '指南2',
                    children: null
                }],
                */
                itemClasses: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    value: 'id'
                },
                rules: {
                    store_id: [
                        { required: true, message: '请选择店铺', trigger: 'blur' }
                    ],
                    item_class_id: [
                        { required: true, message: '请选择分类', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted () {
            if(this.$route.params.type)
                this.type = this.$route.params.type
            this.$http.get('/stores').then(storesRes => {
                this.stores = storesRes.data
            })
            /*
            this.$http.get('/item-classes/tree').then(classesRes => {
                this.itemClasses = classesRes.data
            })
            */
            this.$http.get('/item-classes').then(classesRes => {
                this.itemClasses = classesRes.data
            })
        },
        methods: {
            toNextStep () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if ('single' == this.type)
                            this.$router.push({ path: '/item/item-edit', query: { store_id: this.creater.store_id, item_class_id: this.creater.item_class_id } })
                        else if ('batch' == this.type)
                            this.$router.push({ path: '/item/item-batch-edit', query: { store_id: this.creater.store_id } })
                    } else {
                        return false
                    }
                })
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>