<template>
    <div class="c-item-index">
        <div class="c-header">
            <div class="c-left">
                <!--
                <el-button type="primary" class="c-button" @click="create" size="small"><i class="fa fa-plus"></i>新增商品</el-button>
                -->
                <el-button type="primary" class="c-button" @click="createBatch" size="small"><i class="fa fa-upload"></i>导入商品</el-button>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.name" size="small" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searcher.item_class_id" size="small" placeholder="商品分类">
                            <el-option label="专利" :value="1"></el-option>
                            <el-option label="商标" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="items" class="c-grid">
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="#" width="80"></el-table-column>
                <el-table-column prop="uuid" label="商品编号" width="160"></el-table-column>
                <el-table-column prop="" label="所属分类" width="180">
                    <template scope="scope">
                        {{classNames.get(scope.row.item_class_id)}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="价格" width="120"></el-table-column>
                <el-table-column label="上架时间" width="160">
                    <template scope="scope">
                        {{scope.row.shelved_at | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column fixed="right" label="操作" width="70">
                    <template scope="scope">
                        <a :href="siteUrl + '/item/' + scope.row.id" class="el-button--text" style="text-decoration: none" target="_blank">查看</a>
                        <!--
                        <el-button type="text" @click="view(scope.row.id)" size="small"></el-button>
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                        -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <!--
                    <el-button type="primary" size="small"><i class="fa fa-remove"></i>删除</el-button>
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
        name: 'TqItemIndex',
        data () {
            return {
                items: [],
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                classNames: new Map(),
                searcher: {
                    name: null,
                    item_class_id: null
                },
                siteUrl: config.site.url
            }
        },
        activated () {
            //console.log('activated')
        },
        mounted () {
            //console.log('mounted')
            this.search()
            this.$http.get('/item-classes/flat').then(classesRes => {
                for (let cls of classesRes.data) {
                    this.classNames.set(cls.id, cls.name)
                }
            })
        },
        methods: {
            search (page) {
                let loading = this.$loading({ target: '.c-main' })
                if (page) {
                    this.currentPage = parseInt(page)
                }
                let params = {
                    'page': this.currentPage,
                    'per-page': this.pageSize,
                    'sort': '-id'
                }
                if (this.searcher.name)
                    params.name = '~' + this.searcher.name
                if (this.searcher.item_class_id)
                    params.item_class_id = this.searcher.item_class_id
                this.$http.get('/items', { params }).then(itemsRes => {
                    this.items = itemsRes.data
                    this.totalCount = parseInt(itemsRes.headers['x-pagination-total-count'])
                    loading.close()
                })
            },
            doSearch () {
                if (1 === this.currentPage) {
                    this.search()
                } else {
                    this.currentPage = 1
                }
            },
            create () {
                this.$router.push('/item/item-create')
            },
            createBatch () {
                this.$router.push({path: '/item/item-create/batch'})
            },
            view (id) {

            },
            modify (id) {
                this.$router.push('/item/item-edit/' + id)
            },
            changePage (page) {
                this.search(page)
            }
        }
    }
</script>